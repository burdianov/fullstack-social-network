const mongoose = require("mongoose");
const uuid = require("uuid/v1");
const crypto = require("crypto");

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
    photo: {
      data: Buffer,
      contentType: String
    },
    about: {
      type: String,
      trim: true
    },
    salt: String
  },
  {timestamps: true}
);

/**
 * Virtual fields are additional fields for a given model.
 * Their values can be set manually or automatically with defined functionality
 * Keep in mind: virtual properties (e.g. password) don"t get persisted in the
 * database
 * They only exist logically and are not written to the document"s collection
 */

// virtual fields
userSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuid();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password
  });

// virtual methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto.createHmac("sha1", this.salt)
        .update(password)
        .digest("hex")
    } catch (err) {
      return ""
    }
  }
};

module.exports = mongoose.model("User", userSchema);