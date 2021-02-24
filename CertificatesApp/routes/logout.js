var express = require('express')
var router = express.Router();

router.post('/', function(request, response){
    request.session.loggedin = false;
    request.session.username = "";
    response.redirect('/')
})

module.exports = router;