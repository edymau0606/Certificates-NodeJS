var sql = require('mssql');

var config = {
    user: AZURE_COSMOS_DB_USER,
    password: AZURE_COSMOS_DB_PASSWORD,
    server: AZURE_COSMOS_DB_SERVER,
    database: AZURE_COSMOS_DB_DATABASE,
    encrypt: true
}

module.exports = {
    executeQuery : function executeQuery(query){
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
        })
    }
}