var express = require('express');
var connection = require('../controllers/connection')
var router = express.Router();

router.get('/', function(req, res, next){
    connection.executeQuery("SELECT CertificateTypeID, CertificateTypeName from dbo.[CertificateType]")
    .then(function(response){
        var certificateTypes = []
        for(let i=0; i<response.length; i++){
            certificateTypes.push({id: response[i].CertificateTypeID, name: response[i].CertificateTypeName})
        }
        res.end(JSON.stringify(certificateTypes))
    })
    .catch(function(err){
        res.end(err)
    })
})

module.exports = router