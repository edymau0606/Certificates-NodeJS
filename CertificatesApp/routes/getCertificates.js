var express = require('express');
var connection = require('../controllers/connection')
var router = express.Router();

router.get('/', function(req, res, next){
    connection.executeQuery("SELECT CertificateID, CertificateName, Year, CertificateTypeName, CertificateBlobURL, dbo.[Certificate].CertificateTypeID from dbo.[Certificate] INNER JOIN dbo.[CertificateType] ON dbo.[Certificate].CertificateTypeID = dbo.[CertificateType].CertificateTypeID")
    .then(function(response){
        var data = {}
        var certificates = []
        for(let i=0; i<response.length; i++){
            certificates.push({id: response[i].CertificateID, name: response[i].CertificateName, year: response[i].Year, type: response[i].CertificateTypeName, blobURL: "<a href='"+response[i].CertificateBlobURL+"'>"+response[i].CertificateName+"</a>", html: "<a href='#' class='click' id='"+response[i].CertificateID+"-_-"+response[i].CertificateTypeName+"-_-"+response[i].CertificateBlobURL+"-_-"+response[i].Year+"' name='"+response[i].CertificateName+"' onclick='certificatePreview(this)'><i class='glyphicon glyphicon-list-alt' data-toggle='modal' data-target='#certificate'></i> </a><a href='#' class='click' id='"+response[i].CertificateID+"' name='"+response[i].CertificateName+"' onclick='deleteCertificate(this)'><i class='icon-remove-circle icon-2x'></i></a>"})
        }
        data = {data: certificates}
        res.end(JSON.stringify(data))
    })
    .catch(function(err){
        res.end(err)
    })
})

module.exports = router