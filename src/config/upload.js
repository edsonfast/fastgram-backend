const multer = require('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, callback) {
            callback(null, file.originalname);
        },
    }),
    // limits: {
    //     fileSize: 2 * 1024 + 1024,
    // },
    // fileFilter: (req, file, callback) =>{
    //     const allowedMimes = [
    //         'image/jpeg',
    //         'image/pjeg',
    //         'image/png',
    //         'image/gif'
    //     ];

    //     if (allowedMimes.includes(file.mimetype)){
    //         callback(null, true);
    //     } else {
    //         callback(new Error("Invalid file type."));
    //     }
    // },
}