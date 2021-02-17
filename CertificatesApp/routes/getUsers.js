var express = require('express');
var connection = require('../controllers/connection')
var router = express.Router();

router.get('/', function(req, res, next){
    connection.executeQuery("SELECT UserID, UserName from dbo.[User]")
    .then(function(response){
        var data = {}
        var users = []
        for(let i=0; i<response.length; i++){
            users.push({id: response[i].UserID, userName: response[i].UserName, html: "<a href='#' class='click' id='"+response[i].UserID+"' name='"+response[i].UserName+"' onclick='editUser(this)'><i class= 'icon-edit icon-2x'></i></a><a href='#' class='click' id='"+response[i].UserID+"' name='"+response[i].UserName+"' onclick='deleteUser(this)'><i class='icon-remove-circle icon-2x'></i></a>"})
        }
        data = {data: users}
        res.end(JSON.stringify(data))
    })
    .catch(function(err){
        res.end(err)
    })
})

module.exports = router