const Post = require("../models/post");
const {validationResult} = require('express-validator');

exports.getPosts = (req, res) => {
    res.json({
        posts: [
            {title: "First post"},
            {title: "Second post"}
        ]
    });
};

exports.createPost = (req, res) => {
    // check for errors
    const {errors} = validationResult(req);

    // if errors, show the first one
    if (errors.length > 0) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            error: firstError
        });
    }
    const post = new Post(req.body);
    post.save().then(result => {
        res.status(200).json({
            post: result
        })
    });
};