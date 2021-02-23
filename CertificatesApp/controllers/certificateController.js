const
    azureStorage = require('azure-storage'),
    blobService = azureStorage.createBlobService(),
    containerName = 'certificates'

const getStream = require('into-stream')
const Certificate = require('../models/certificate')
const db = require('../controllers/connection')
certificateController = {}

// module.exports.create = (db, uploadStrategy) => {
//     // return new Promise((res, rej) => {
//     //     db.executeQuery("INSERT INTO dbo.[Student] VALUES('"+student.name+"', '"+student.lastName+"', '"+student.career+"', "+student.age+")")
//     //     .then(function(response){
//     //         res(response);
//     //     })
//     //     .catch(function(err){
//     //         rej(err);
//     //     })
//     // }) 
//     //var upload = function(req, res) {
//         console.log(uploadStrategy.file.originalname)
//     //}
    
// }

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
    console.log(req.file.originalname)
    var ext = req.file.originalname.substr(req.file.originalname.lastIndexOf('.') + 1);
    var certificateName = req.body.certificateName + "." +ext;
    var blobURL = "https://certificatesazurestorage.blob.core.windows.net/certificates/" + certificateName;
    var certificate = new Certificate(certificateName, req.body.year, req.body.certificateType, blobURL)
    console.log(certificate)

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
                    res.redirect("/certificates?_method=GET")
                })
                .catch(function(err){
                    rej(err);
                })
            
            })
        }
    })
}

module.exports = certificateController;