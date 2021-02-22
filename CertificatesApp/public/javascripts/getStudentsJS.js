function listStudents(){
    $('#student_id').DataTable({
        "ajax": {
            "metod": "GET",
            "url": window.location.origin + "/getStudents"
        },
        "columns": [
            { "data": "fullName" },
            { "data": "career" },
            { "data": "age" },
            { "data": "html" }
        ]
    })
}

function editStudent(student) {
    var name = (((student.name).split("-"))[0]).trim();
    var lastName = (((student.name).split("-"))[1]).trim();
    var career = (((student.name).split("-"))[2]).trim();
    var age = (((student.name).split("-"))[3]).trim();
    location.href = window.location.origin + "/createStudent?name=" + name + "&lastName=" + lastName +"&career=" + escape(career) +"&age=" + age +"&flag=edit"
}

function deleteStudent(student){
    var name = (((student.name).split("-"))[0]).trim();
    var lastName = (((student.name).split("-"))[1]).trim();
    var opcion = confirm("Are you sure you want to delete: "+name+" "+lastName)
    if (opcion == true) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": window.location.origin + "/students/" + name+"-"+lastName,
            "method": "DELETE",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function(response){
            console.log(response);
            location.reload();
        })
    }
}