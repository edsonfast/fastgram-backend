const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const PostController = require('./controller/PostController');
const LikeController = require('./controller/LikeController');
const CommentController = require('./controller/CommentController');

const routes = new express.Router();

// Upload file - entender o corpo do post Content-Type = multipart/form-data
const mu = multer(multerConfig);


routes.get('/posts', PostController.index);
routes.post('/posts', mu.single('image'), PostController.store);

routes.post('/posts/:id/like', LikeController.store);
routes.post('/posts/:id/comment', mu.single('image'), CommentController.store);

module.exports = routes;