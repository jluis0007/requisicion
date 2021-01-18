const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/public/img/fotos')
    },
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})

const upload = multer({ storage: storage })
    // const multer = require('multer');
    // const storage = multer.diskStorage({
    //     destination: function(req, file, cb) {
    //         cb(null, './public/img/fotos')
    //     },
    //     filename: function(req, file, cb) {
    //         cb(null, `${file.fieldname}-${Date.now()}`)
    //     }
    // });

// const upload = multer({ storage });

module.exports = upload;