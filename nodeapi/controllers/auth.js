const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const {validationResult} = require('express-validator');

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
                error: "User with this email does not exist. Please signup"
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Wrong email or password"
            })
        }
        // generate a token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        // provide the token to the frontend in two ways - user will decide
        // which one to use
        // 1: persist the token as 'tkn' in cookie with expiry date
        res.cookie("tkn", token, {expire: new Date() + 360000});

        // 2: return response with user and token to frontend client
        const {_id, name, email} = user;
        return res.json({token, user: {_id, email, name}})
    });

};