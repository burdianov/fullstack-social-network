const jwt = require("jsonwebtoken");
const _ = require("lodash");
require("dotenv").config();
const expressJwt = require("express-jwt");
const User = require("../models/user");
const {validationResult} = require("express-validator");
const {sendEmail} = require("../helpers");

exports.signUp = async (req, res) => {
  // check for errors
  const {errors} = validationResult(req);

  // if errors, show the first one
  if (errors.length > 0) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({
      error: firstError
    });
  }
  const userExists = await User.findOne({email: req.body.email});
  if (userExists) return res.status(403).json({
    error: "Email is taken!"
  });
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({message: "Signup success! Please login."})
};
exports.signIn = (req, res) => {
  const {email, password} = req.body;
  User.findOne({email}, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with this email does not exist. Please signup."
      })
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Wrong email or password"
      })
    }
    // generate a token with user id and secret
    const token = jwt.sign({
      _id: user._id,
      role: user.role
    }, process.env.JWT_SECRET);

    // provide the token to the frontend in two ways - user will decide
    // which one to use
    // 1: persist the token as "tkn" in cookie with expiry date
    res.cookie("tkn", token, {expire: new Date() + 360000});

    // 2: return response with user and token to frontend client
    const {_id, name, email, role} = user;
    return res.json({token, user: {_id, email, name, role}})
  });
};
exports.signOut = (req, res) => {
  res.clearCookie("tkn");
  return res.json({
    message: "Signout success!"
  })
};
exports.requireSignIn = expressJwt({
  // if the token is valid, express jwt appends the verified user's id
  // in an auth key to the request object
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});
exports.forgotPassword = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "No request body."
    });
  }
  if (!req.body.email) {
    return res.status(400).json({
      message: "No email in request body."
    });
  }

  const {email} = req.body;
  User.findOne({email}, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist."
      });
    }
    const token = jwt.sign(
      {_id: user._id, iss: "NODEAPI"},
      process.env.JWT_SECRET
    );
    const emailData = {
      from: "noreply@node-react.com",
      to: email,
      subject: "Password reset link.",
      html: `<p>Please use the following link to reset your password:</p><p>${process.env.CLIENT_URL}/reset-password/${token}</p>`
    };
    return user.updateOne({resetPasswordLink: token}, (err, success) => {
      if (err) {
        return res.json({message: err});
      } else {
        sendEmail(emailData);
        return res.status(200).json({
          message: `Email has been sent to ${email}. Follow the instructions to reset your password.`
        })
      }
    });
  });
};
exports.resetPassword = (req, res) => {
  const {errors} = validationResult(req);
  if (errors.length > 0) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({
      error: firstError
    });
  }
  const {resetPasswordLink, newPassword} = req.body;
  User.findOne({resetPasswordLink}, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "Invalid Link!"
      });
    }
    const updatedFields = {
      password: newPassword,
      resetPasswordLink: ""
    };
    user = _.extend(user, updatedFields);
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json({
        message: `Great! Now you can login with your new password.`
      })
    });
  });
};
exports.socialLogin = (req, res) => {
  let user = User.findOne({email: req.body.email}, (err, user) => {
    if (err || !user) {
      user = new User(req.body);
      req.profile = user;
      user.save();

      const token = jwt.sign(
        {_id: user._id, iss: "NODEAPI"},
        process.env.JWT_SECRET
      );
      res.cookie("t", token, {expire: new Date() + 9999});
      const {_id, name, email} = user;
      return res.json({token, user: {_id, name, email}});
    } else {
      req.profile = user;
      user = _.extend(user, req.body);
      user.save();

      const token = jwt.sign(
        {_id: user._id, iss: "NODEAPI"},
        process.env.JWT_SECRET
      );
      res.cookie("t", token, {expire: new Date() + 9999});
      const {_id, name, email} = user;
      return res.json({token, user: {_id, name, email}});
    }
  });
};