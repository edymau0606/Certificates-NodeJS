module.exports.verifyCredentials = (db, user) => {
    return new Promise((res, rej) =>{
        let psw = Buffer.from(user.userPassword, 'base64').toString();
        sha1 = require('js-sha1');
        let password = sha1(psw)
        db.executeQuery("SELECT UserName FROM dbo.[User] WHERE UserName='"+user.userName+"' AND Password='"+password+"'")
        .then(function(response){
            if(response[0]==undefined) {
                res(false)
            } else {
                res(response[0].UserName)
            }
        })
        .catch(function(err){
            rej(err);
        })
    })
}