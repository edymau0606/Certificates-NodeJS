var sql = require('mssql');
require('dotenv').config()

var user = process.env

var config = {
    user: process.env.AZURE_COSMOS_DB_USER,
    password: process.env.AZURE_COSMOS_DB_PASSWORD,
    server: process.env.AZURE_COSMOS_DB_SERVER,
    database: process.env.AZURE_COSMOS_DB_DATABASE,
    encrypt: true
}

module.exports = {
    executeQuery : function executeQuery(query){
        console.log(user)
        return new Promise((res, rej)=>{
            var conn = new sql.ConnectionPool(config);
            conn.connect()
            .then(function(){
                var req = new sql.Request(conn);
                req.query(query)
                .then(function(recordset){
                    res(recordset.recordset)
                    conn.close;
                })
                .catch(function(err){
                    console.log(err);
                    rej(err);
                    conn.close;
                })
            })
            .catch(function(err){
                console.log(err)
            })
        })
    }
}