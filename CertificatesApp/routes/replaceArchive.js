const
    azureStorage = require('azure-storage'),
    blobService = azureStorage.createBlobService(),
    getStream = require('into-stream'),
    containerName = 'certificatesdone'

    const JSZip = require('jszip');
    const Docxtemplater = require('docxtemplater');
    const express = require('express');
    const router = express.Router();

    const fs = require('fs');
    const path = require('path');

    router.post('/', function(req, res, next){
        var replaceData = (JSON.parse(req.body.replaceData));
        var certificateName = req.body.certificateName
        var certificateType = req.body.certificateType
        var fullName = req.body.fullName
        var year = req.body.year
        var content = fs.readFileSync(path.resolve(__dirname+"/certificates/"+unescape(certificateName)), 'binary')

        var zip = new JSZip(content)
        var doc = new Docxtemplater();
        doc.loadZip(zip);
        doc.setData(replaceData)

        try {
            doc.render();
        } catch (error){
            var e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties
            }
            console.log(JSON.stringify({
                error: e
            }));
            throw error;
        }

        var buf=doc.getZip()
        .generate({
            type: 'nodebuffer',
            compression: "DEFLATE"
        });

        const   
            blobName = fullName+"_"+certificateType+"_"+year+"_"+certificateName,
            stream  = getStream(buf),
            streamLength = buf.length;

        blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err=>{
            if(err) {
                handleError(err);
            } else {
                try {
                    fs.unlinkSync(path.resolve(__dirname + "/certificates/", unescape(certificateName)));
                    res.send(blobName)
                } catch (err) {
                    console.error(err);
                }
            }
        })
    })

    router.delete('/:name', function(req, res, next) {
        var certificateName = unescape(req.params.name)
        fs.stat(path.resolve(__dirname + "/certificates/", certificateName), function(err, stat) {
            if(err == null) {
                fs.unlinkSync(path.resolve(__dirname + "/certificates/", certificateName));
            } else if (err.code == 'ENOENT') {
                console.log("File doesn't exists");
            } else {
                console.log("Some other error: ", err.code);
            }
        });
    });

module.exports = router;