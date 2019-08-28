const multer = require('multer');
const path = require('path');
const crypto = require("crypto");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        // Se der erro retorna o err para o calback do multer
        if (err) cb(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    }
  })
};

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "uploads"),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
};

// module.exports = {
//     storage: new multer.diskStorage({
//         destination: path.resolve(__dirname, '..', '..', 'uploads'),
//         filename: function(req, file, callback) {
//             callback(null, file.originalname);
//         },
//     }),
//     // limits: {
//     //     fileSize: 2 * 1024 + 1024,
//     // },
//     // fileFilter: (req, file, callback) =>{
//     //     const allowedMimes = [
//     //         'image/jpeg',
//     //         'image/pjeg',
//     //         'image/png',
//     //         'image/gif'
//     //     ];

//     //     if (allowedMimes.includes(file.mimetype)){
//     //         callback(null, true);
//     //     } else {
//     //         callback(new Error("Invalid file type."));
//     //     }
//     // },
// }