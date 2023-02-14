function convertFileName(filename){
    let convertName;
    if(filename.includes(" ")){
        let removeSpace=filename.split(" ").join("-").toLowerCase();
        var temp_file_arr = removeSpace.split('.')
        var temp_file_name = temp_file_arr[0]
        var temp_file_extension = temp_file_arr[1]
        convertName=temp_file_name + '-' + Date.now() + `.${temp_file_extension}`
        console.log("🚀 ~ file: convertFileName.js ~ line 10 ~ convertFileName ~ convertName", convertName)
        return convertName;
    }else{
        var temp_file_arr = filename.toLowerCase().split('.')
        var temp_file_name = temp_file_arr[0]
        var temp_file_extension = temp_file_arr[1]
        convertName=temp_file_name + '-' + Date.now() + `.${temp_file_extension}`
        console.log("🚀 ~ file: convertFileName.js ~ line 16 ~ convertFileName ~ convertName", convertName);
        return convertName;
    }
    
}

module.exports=convertFileName