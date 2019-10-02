const {check} = require('express-validator');

exports.createPostValidator = [
    check("title", "Add a title").not().isEmpty(),
    check("title", "Title must be between 4 to 150 characters").isLength({
        min: 4,
        max: 150
    }),
    check("body", "Add body text").not().isEmpty(),
    check("body", "Body must be between 4 to 200 0 characters").isLength({
        min: 4,
        max: 2000
    })
];

exports.userSignupValidator = [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password").isLength({min: 6})
        .withMessage("Password must have at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a digit")
];