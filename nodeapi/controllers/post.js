const Post = require("../models/post");
const {validationResult} = require("express-validator");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: err
        })
      }
      req.post = post;
      next();
    });
};
exports.getPosts = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 3;
  let totalItems;

  const posts = await Post.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Post.find()
        .skip((currentPage - 1) * perPage)
        .populate("comments", "text created")
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .sort({createdAt: -1})
        .limit(perPage)
        .select("_id title body likes");
    })
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => console.log(err));
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
exports.getPostsByUser = (req, res) => {
  Post.find({postedBy: req.profile._id})
    .populate("postedBy", "_id name role")
    .select("_id title body createdAt likes")
    .sort("createdAt")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }
      res.json(posts)
    });
};
exports.isPoster = (req, res, next) => {
  let sameUser = req.post && req.auth && req.post.postedBy._id.toString() === req.auth._id.toString();
  let adminUser = req.post && req.auth && req.auth.role === "admin";

  console.log("req.post: ", req.post, "; req.auth: ", req.auth);
  console.log("sameuser: ", sameUser, "; adminuser: ", adminUser);

  let isPoster = sameUser || adminUser;

  if (!isPoster) {
    return res.status(403).json({
      error: "User not authorized."
    })
  }
  next();
};
exports.updatePost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      });
    }
    let post = req.post;
    post = _.extend(post, fields);

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }

    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(post);
    });
  });
};
exports.deletePost = (req, res) => {
  let post = req.post;
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err
      })
    }
    res.json({
      message: "Post deleted successfully."
    })
  });
};
exports.getPostPhoto = (req, res, next) => {
  res.set("Content-Type", req.post.photo.contentType);
  return res.send(req.post.photo.data);
};
exports.getPost = (req, res) => {
  return res.json(req.post);
};
exports.like = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId, {$push: {likes: req.body.userId}}, {new: true})
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      } else {
        res.json(result);
      }
    })
};
exports.unlike = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId, {$pull: {likes: req.body.userId}}, {new: true})
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      } else {
        res.json(result);
      }
    })
};