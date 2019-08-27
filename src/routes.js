const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controller/PostController');
const LikeController = require('./controller/LikeController');

const routes = new express.Router();

// Upload file - entender o corpo do post multipart data
const upload = multer(uploadConfig);


routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;