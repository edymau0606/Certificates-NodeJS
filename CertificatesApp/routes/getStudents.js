var express = require('express');
var connection = require('../controllers/connection')
var router = express.Router();

router.get('/', function(req, res, next){
    connection.executeQuery("SELECT StudentID, Name, LastName, Career, Age from dbo.[Student]")
    .then(function(response){
        var data = {}
        var students = []
        for(let i=0; i<response.length; i++){
            students.push({id: response[i].StudentID, name: response[i].Name, lastName: response[i].LastName, career: response[i].Career, age: response[i].Age, html: "<a href='#' class='click' id='"+response[i].StudentID+"' name='"+response[i].Name+"-"+response[i].LastName+"-"+response[i].Career+"-"+response[i].Age+"' onclick='editStudent(this)'><i class= 'icon-edit icon-2x'></i></a><a href='#' class='click' id='"+response[i].StudentID+"' name='"+response[i].Name+"-"+response[i].LastName+"' onclick='deleteStudent(this)'><i class='icon-remove-circle icon-2x'></i></a>"})
        }
        data = {data: students}
        res.end(JSON.stringify(data))
    })
    .catch(function(err){
        res.end(err)
    })
})

module.exports = router