const Post = require("../models/post");
const {validationResult} = require("express-validator");
const formidable = require("formidable");
const fs = require("fs");

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("postedBy", "_id name")
            .select("_id title body");
        await res.json({posts});
    } catch (err) {
        console.error(err);
    }
};

exports.createPost = (req, res, next) => {
    // check for errors
    const {errors} = validationResult(req);

    // if errors, show the first one
    if (errors.length > 0) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            error: firstError
        });
    }
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded."
            })
        }
        let post = new Post(fields);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(result);
        });
    });
};