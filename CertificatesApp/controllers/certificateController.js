const
    azureStorage = require('azure-storage'),
    blobService = azureStorage.createBlobService(),
    containerName = 'certificates'

const getStream = require('into-stream')
const Certificate = require('../models/certificate')
const db = require('../controllers/connection')
certificateController = {}

const handleError = (err, res) => {
    res.status(500);
    res.render('error', {
        error: err
    })
}

const getBlobName = originalName => {
    return `${originalName}`;
}

certificateController.write = function(req, res){
    var ext = req.file.originalname.substr(req.file.originalname.lastIndexOf('.') + 1);
    var certificateName = req.body.certificateName + "." +ext;
    var blobURL = "https://certificatesazurestorage.blob.core.windows.net/certificates/" + certificateName;
    var certificate = new Certificate(certificateName, req.body.year, req.body.certificateType, blobURL)

      const
        blobName = getBlobName(certificateName)
        stream = getStream(req.file.buffer),
        streamLength = req.file.buffer.length;

    blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err=>{
        if (err) {
            handleError(err)
        } else {
            return new Promise((response, rej) => {
                db.executeQuery("INSERT INTO dbo.[Certificate] VALUES('"+certificate.certificateName + "', " + certificate.year + ", " + certificate.certificateType + ", '" + certificate.certificateBlobURL + "')")
                .then(function(response) { 
                    res.redirect("/certificates")
                })
                .catch(function(err){
                    rej(err);
                })
            
            })
        }
    }) 
}

certificateController.remove = function(req, res) {
    const blobname = getBlobName(req.params.certificateName)
    blobService.deleteBlobIfExists(containerName, blobname, err=> {
        if(err) {
            handleError(err)
        } else {
            return new Promise((response, rej) =>{
                db.executeQuery("DELETE FROM dbo.[Certificate] WHERE CertificateName ='"+ blobname + "'")
                .then(function(response){
                    res.send("true")
                })
                .catch(function(err){
                    rej(err)
                })
            })
        }
    })
}

/*module.exports.delete = function(db, name){
    return new Promise((res, rej) => {
        res("fasf")
        const certificateName = unescape(name)
    const blobName = getBlobName(certificateName)
     blobService.deleteBlobIfExists(containerName, blobName, err => {
        if (err) {
            rej(err)
        } else {
                res({ message: `Block blob '${certificateName}' deleted` });
                db.executeQuery("DELETE FROM dbo.Certificate WHERE CertificateID = '" + certificateName + "'")
                .then(function (response) {
                    res(response)
                })
                .catch(function (err) {
                    rej(err);
                })
            }
        })
    }) 
}*/

module.exports = certificateController;