module.exports.create = (db, user) => {
    return new Promise((res, rej) => {
        let psw = Buffer.from(user.userPassword, 'base64').toString()
        sha1 = require('js-sha1')
        let password = sha1(psw)
        db.executeQuery("INSERT INTO dbo.[User] VALUES('"+user.userName+"', '"+password+"')")
        .then(function(response){
            res(response);
        })
        .catch(function(err){
            rej(err);
        })
    })
}