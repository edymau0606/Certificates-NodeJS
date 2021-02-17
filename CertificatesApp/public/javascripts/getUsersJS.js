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