const mongoose = require("mongoose");

const EmailTemplate = new mongoose.Schema({
  template: { type: String, required: true },
  type: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("emailtemplate", EmailTemplate);
