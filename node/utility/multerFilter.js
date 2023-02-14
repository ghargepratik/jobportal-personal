const multerFilter = (req, file, cb) => {
    console.log('🚀 ~ file: fileUploads.js:41 ~ multerFilter ~ file', file)
    if (
        file.mimetype.split('/')[1] === 'pdf' || //mimetype: 'image/png'
        file.mimetype.split('/')[1] === 'png' ||
        file.mimetype.split('/')[1] === 'jpeg' ||
        file.mimetype.split('/')[1] === 'vnd.oasis.opendocument.text' || //odt
        file.mimetype.split('/')[1] === 'msword' || //doc
        file.mimetype.split('/')[1] ===
            'vnd.openxmlformats-officedocument.wordprocessingml.document' || //docx
        file.mimetype.split('/')[1] === 'jpg'
    ) {
        cb(null, true)
    } else {
        cb(new Error('This file is not supported!!'), false)
    }
}

module.exports = multerFilter
