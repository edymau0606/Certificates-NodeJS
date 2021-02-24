const
    azureStorage = require('azure-storage'),
    blobService = azureStorage.createBlobService(),
    containerName = 'certificates'
    dotenv = require('dotenv')

var express = require('express');
var router = express.Router();
var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
var InspectModule = require("docxtemplater/js/inspect-module");
var iModule = InspectModule();

var fs=require('fs');
var path = require('path')

function generate(certificateName) {
    return new Promise((res, rej) =>{
        blobService.getBlobToStream(containerName, unescape(certificateName), fs.createWriteStream(path.resolve(__dirname+"/certificates/", unescape(certificateName))), function(error, serverBlob){
            if(!error){
                res(unescape(certificateName))
            } else {
                rej(error);
            }
        })
    })
}

router.post('/', function(req, res, next){
    var url=unescape(req.body.url);
    var certificateName = url.substring(url.lastIndexOf('/') + 1)
    generate(certificateName)
    .then(function (){
         var content = fs
            .readFileSync(path.resolve(__dirname+ "/certificates/", unescape(certificateName)), 'binary')
            var zip = new JSZip(content);

            var doc = new Docxtemplater();
            doc.loadZip(zip);
            doc.attachModule(iModule);
            doc.render();
            var tags = iModule.getAllTags();
            res.send(tags)
    })
})

module.exports = router;