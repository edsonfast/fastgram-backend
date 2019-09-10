const Post = require('../models/Post');

module.exports = {
    async index(req, res) {
        // - para Decrescente
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },

    async store(req, res){
        //console.log(req.body);
        //console.log(req.params.id);

        // Desestruturação
        const { comment } = req.body;
        const post = await Post.findById(req.params.id);

        //console.log(comment);

        post.comments.push({
            comment
        });

        await post.save();

        req.io.emit('comment', post);

        return res.json(post);
    }
};