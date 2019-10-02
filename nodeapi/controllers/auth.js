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
