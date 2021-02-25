var express = require('express');
var router = express.Router();
var login = require('../controllers/loginController')
var db = require('../controllers/connection')
var User = require('../models/user')

router.get('/', function(req, res, next){
    res.render('login', {
        logOutButton: "Hide"
    })
})

router.post('/', function(request, response){
    var username = request.body.username;
    var password = request.body.password;

    if(username && password) {
        var user = new User(username, password, 0)
        login.verifyCredentials(db, user).then(function(res){
            if(res==false){
                response.render("login", {
                    errorType: "Fail",
                    logOutButton: "Hide"
                })
            } else {
                request.session.loggedin = true;
                request.session.username = res;
                response.redirect('/')
            }
        })
    } else {
        response.render("login", {
            errorType: "Blank",
            logOutButton: "Hide"
        })
    }
})

router.put('/:id', function(request, response) {
    request.session.loggedin = false;
    request.session.username = "";
    response.redirect('/')
})

module.exports = router;