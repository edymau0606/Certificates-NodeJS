var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.loggedin) {
    var userInfo = (req.session.username)
        res.render('createCertificate', {
            userName: userInfo
        })
  } else {
      res.redirect("login")
  }
});

module.exports = router;