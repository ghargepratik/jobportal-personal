const multer = require('multer')
const convertFileName = require('./convertFileName')
const multerFilter = require('../utility/multerFilter.js')

//For CompanyLogo (While creating Job)
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/company-logo')
        },
        filename: function (req, file, cb) {
            var convertedName = convertFileName(file.originalname)
            console.log(
                '🚀 ~ file: fileUploads.js ~ line 11 ~ convertedName',
                convertedName
            )
            // var temp_file_arr = file.originalname.split('.')
            // var temp_file_name = temp_file_arr[0]
            // var temp_file_extension = temp_file_arr[1]
            cb(null, convertedName)
        },
    }),
    limits: { fileSize: 5000000 },
}).single('file')

//BEFOR SERVER UPLOADING
// const resume = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, './public/resumes')
//         },
//         filename: function (req, file, cb) {
//             var convertedName=convertFileName(file.originalname)
//             console.log("🚀 ~ file: fileUploads.js ~ line 26 ~ convertedName", convertedName)
//             // var temp_file_arr = file.originalname.split('.')
//             // var temp_file_name = temp_file_arr[0]
//             // var temp_file_extension = temp_file_arr[1]
//             cb(null, convertedName)
//         },
//     }),
// }).single('file')

const resume = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/resumes')
        },
        filename: function (req, file, cb) {
            var convertedName = convertFileName(file.originalname)
            console.log(
                '🚀 ~ file: fileUploads.js ~ line 26 ~ convertedName',
                convertedName
            )
            // var temp_file_arr = file.originalname.split('.')
            // var temp_file_name = temp_file_arr[0]
            // var temp_file_extension = temp_file_arr[1]
            cb(null, convertedName)
        },
    }),
    fileFilter: multerFilter,
    limits: { fileSize: 5000000 },
}).single('file')

module.exports = { upload, resume }
