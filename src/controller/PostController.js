const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        // - para Decrescente
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },

    async store(req, res){
        //console.log(req.file);
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        // Extensão da imagem como JPG
        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        // Redimenciona a imagem
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        // Deleta a imagem original
        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        req.io.emit('post', post);

        return res.json(post);
    }
};