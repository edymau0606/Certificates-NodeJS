var express = require('express');
var router = express.Router();

router.get('/', function(){
    res.render('login', {
        logOutButton: "Hide"
    })
})

router.post('/', function(request, response){
    var username = request.body.username;
})

module.exports = router;