var express = require('express');
var router = express.Router();
var db = require('../controllers/connection')
var students = require('../controllers/studentController');
var Student = require('../models/student');

router.get('/', function(req, res, next) {
  res.render('listStudents');
});

router.post('/', function(req, res, next){
  var student = new Student(req.body.name, req.body.lastName, req.body.career, req.body.age)
  students.create(db, student)
  .then(function(response){
    res.send(response);
  })
  .catch(function(err){
    res.send(err);
  })
});

router.put('/:fullName', function(req, res, next){
  var fullName = req.params.fullName;
  var student = new Student(req.body.name, req.body.lastName, req.body.career, req.body.age)
  students.update(db, fullName, student)
  .then(function(response){
    res.send(response);
  })
  .catch(function(err){
    res.send(err);
  })
})

router.delete('/:fullName', function(req,res,next){
  var fullName = req.params.fullName;
  students.delete(db, fullName)
  .then(function(response){
    res.send(response);
  })
  .catch(function(err){
    res.send(err);
  })
})

module.exports = router;
