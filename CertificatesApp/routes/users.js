var express = require('express');
var router = express.Router();
var db = require('../controllers/connection')
var users = require('../controllers/userController');
var User = require('../models/user');

router.get('/', function(req, res, next) {
  if(req.session.loggedin) {
    var userInfo = (req.session.username)
        res.render('listUsers', {
            userName: userInfo
        })
  } else {
      res.redirect("login")
  }
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

router.put('/:name', function(req, res, next){
  var name = req.params.name;
  var user = new User(req.body.userName, req.body.userPassword)
  users.update(db, name, user)
  .then(function(response){
    res.send(response);
  })
  .catch(function(err){
    res.send(err);
  })
})

router.delete('/:name', function(req,res,next){
  var name = req.params.name;
  users.delete(db, name)
  .then(function(response){
    res.send(response);
  })
  .catch(function(err){
    res.send(err);
  })
})

module.exports = router;
