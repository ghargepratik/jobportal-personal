const multer = require('multer')

const commemtfiles = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/commentfiles')
        },
        filename: function (req, file, cb) {
            var temp_file_arr = file.originalname.split('.')
            var temp_file_name = temp_file_arr[0]
            var temp_file_extension = temp_file_arr[1]
            cb(null, temp_file_name + '-' + Date.now() + `.${temp_file_extension}`)
        },
    }),
}).array('files')

module.exports = commemtfiles
