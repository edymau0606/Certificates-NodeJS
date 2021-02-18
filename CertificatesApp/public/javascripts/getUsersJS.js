function listUsers(){
    $('#user_id').DataTable({
        "ajax": {
            "metod": "GET",
            "url": window.location.origin + "/getUsers"
        },
        "columns": [
            { "data": "userName" },
            { "data": "html" }
        ]
    })
}

function editUser(user) {
    var name = (user.name).trim();
    location.href = window.location.origin + "/createUser?userName=" + name + "&flag=edit"
}

function deleteUser(user){
    var opcion = confirm("Are you sure you want to delete: "+user.name)
    if (opcion == true) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": window.location.origin + "/users/" + user.name,
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