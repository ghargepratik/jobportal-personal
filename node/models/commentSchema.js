const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    singlejobapplicationid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appliedJob",
      required: true,
    },
    time: { type: Date, default: Date.now },
    files: [Object],
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentSchema);
