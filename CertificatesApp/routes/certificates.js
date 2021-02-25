var express = require('express');
var router = express.Router();
var db = require('../controllers/connection')
var multer = require('multer')
var certificates = require('../controllers/certificateController')

router.get('/', function(req, res, next) {
    if(req.session.loggedin) {
        var userInfo = (req.session.username)
            res.render('listCertificates', {
                userName: userInfo
            })
    } else {
        res.redirect("login")
    }
});

inMemoryStorage = multer.memoryStorage(),
    uploadStrategy = multer({
        storage: inMemoryStorage
    }).single('certificate')

router.post('/', uploadStrategy, certificates.write);

router.delete('/:certificateName', certificates.remove);

module.exports = router;
