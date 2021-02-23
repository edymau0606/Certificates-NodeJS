class Certificate {
    constructor (certificateName, year, certificateType, certificateBlobURL){
        this.certificateName = certificateName
        this.year = year
        this.certificateType = certificateType
        this.certificateBlobURL = certificateBlobURL
    }
}

module.exports = Certificate;