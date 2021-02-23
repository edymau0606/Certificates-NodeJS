var express = require('express');
var router = express.Router();
var db = require('../controllers/connection')
var multer = require('multer')
var path = require('path')
var certificates = require('../controllers/certificateController')

router.get('/', function(req, res, next) {
  res.render('listCertificates');
});

// let storage = multer.memoryStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/docs')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname + path.extname(file.originalname)); 
//     }
// })

inMemoryStorage = multer.memoryStorage(),
    uploadStrategy = multer({
        storage: inMemoryStorage
    }).single('certificate')

// var upload = multer({storage})

router.post('/', uploadStrategy, certificates.write);

// router.put('/:fullName', function(req, res, next){
//   var fullName = req.params.fullName;
//   var student = new Student(req.body.name, req.body.lastName, req.body.career, req.body.age)
//   students.update(db, fullName, student)
//   .then(function(response){
//     res.send(response);
//   })
//   .catch(function(err){
//     res.send(err);
//   })
// })

// router.delete('/:fullName', function(req,res,next){
//   var fullName = req.params.fullName;
//   students.delete(db, fullName)
//   .then(function(response){
//     res.send(response);
//   })
//   .catch(function(err){
//     res.send(err);
//   })
// })

module.exports = router;
