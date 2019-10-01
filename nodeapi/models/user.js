const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);