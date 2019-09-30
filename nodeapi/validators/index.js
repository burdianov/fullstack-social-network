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