exports.checkImageType = (file) => {
    if(file === "image/jpeg" || file === "image/jpg" || file === "image/png"){
        return true
    }else {
        return false
    }
}