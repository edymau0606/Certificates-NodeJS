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