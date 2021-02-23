var express = require('express');
var router = express.Router();
var db = require('../controllers/connection')
var multer = require('multer')
var certificates = require('../controllers/certificateController')

router.get('/', function(req, res, next) {
  res.render('listCertificates');
});

inMemoryStorage = multer.memoryStorage(),
    uploadStrategy = multer({
        storage: inMemoryStorage
    }).single('certificate')

router.post('/', uploadStrategy, certificates.write);

router.delete('/:certificateName', function(req, res, next){
    var name = req.params.certificateName;
    console.log(name)
    certificates.delete(db, name)
});

module.exports = router;
