function listCertificates(){
    $('#table_id').DataTable({
        "ajax": {
            "method": "GET",
            "url": window.location.origin + "/getCertificates"
        },
        "columns": [
            {"data": "name"},
            {"data": "year"},
            {"data": "type"},
            {"data": "blobURL"},
            {"data": "html"}
        ]
    })
}

function certificatePreview(certificate){
    
}

function cleanArrays(){
    var variableNameError = document.getElementById("variableNameError")
    variableNameError.hidden = true;
    variableNameError.innerHTML = 'Variables not found in Data Base'
}

function editCertificate(certificate) {
    var name = (((certificate.name).split("-_-"))[0]).trim();
    var year = (((certificate.name).split("-_-"))[1]).trim();
    var type = (((certificate.name).split("-_-"))[2]).trim();
    location.href = window.location.origin + "/createCertificate?name=" + escape(name) + "&year=" + year +"&type=" + type +"&flag=edit"
}

function deleteCertificate(certificate){
    var name = certificate.name
    var opcion = confirm("Are you sure you want to delete: "+name)
    if (opcion == true) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": window.location.origin + "/certificates/" + name,
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