const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserModelSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: "ROLE_USER" },
    token: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserModel', UserModelSchema);