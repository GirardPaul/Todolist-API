const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let TodosModelSchema = new Schema({
  task: {type: String},
  done: {type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}
});

module.exports = mongoose.model('SiteModel', SiteModelSchema );