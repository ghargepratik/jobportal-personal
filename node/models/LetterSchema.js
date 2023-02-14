const mongoose = require("mongoose");

const LetterSchema = new mongoose.Schema({
  joining_date: { type: Date, required: true },
  bond_period: { type: String, required: true },
  file_path_url: { type: String, default:null },
  bond_condition: { type: String, required: true },
  special_instruction: { type: String, required: true },
  
  ctc: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
);

module.exports = mongoose.model("letter", LetterSchema);
