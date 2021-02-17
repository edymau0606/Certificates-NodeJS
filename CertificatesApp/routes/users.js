var express = require('express');
var router = express.Router();
var db = require('../controllers/connection')
var users = require('../controllers/userController');
var User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('listUsers');
});

router.post('/', function(req, res, next){
  var user = new User(req.body.userName, req.body.userPassword)
  users.create(db, user)
  .then(function(response){
    res.send(response);
  })
  .catch(function(err){
    res.send(err);
  })
});

module.exports = router;
