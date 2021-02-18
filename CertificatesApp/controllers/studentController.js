module.exports.create = (db, student) => {
    return new Promise((res, rej) => {
        db.executeQuery("INSERT INTO dbo.[Student] VALUES('"+student.name+"', '"+student.lastName+"', '"+student.career+"', '"+student.age+"', '"+student.grade+"')")
        .then(function(response){
            res(response);
        })
        .catch(function(err){
            rej(err);
        })
    })
}

module.exports.update = (db, fullName, user) => {
    return new Promise((res, rej) => {
        var firstName = (fullName.split("-"))[0]
        var lastName = (fullName.split("-"))[1]
        db.executeQuery("UPDATE dbo.[Student] SET Name = '"+student.name+"', LastName = '"+student.lastName+"', Career = '"+student.career+"', Age = '"+student.age+"', Grade = '"+student.grade+"' WHERE Name = '"+firstName+"' AND LastName = '"+lastName+"'")
        .then(function(response){
            res(response);
        })
        .catch(function(err){
            rej(err);
        })
    })
}

module.exports.delete = (db, fullName) => {
    return new Promise((res, rej) => {
        var firstName = (fullName.split("-"))[0]
        var lastName = (fullName.split("-"))[1]
        db.executeQuery("DELETE FROM dbo.[Student] WHERE Name = '"+firstName+"' AND LastName = '"+lastName+"'")
        .then(function(response){
            res(response);
        })
        .catch(function(err){
            rej(err);
        })
    })
}