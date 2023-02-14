const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema(
  {
    jobstatus: { type: Boolean, default: true },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    companyname: { type: String, required: true },
    tagline: { type: String },
    email: { type: String, required: true },
    linkdin: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    jobtitle: { type: String, required: true },
    experience_from: { type: String, required: true },
    experience_to: { type: String, required: true },
    joblocation: { type: String, required: true },
    rate: { type: String },
    eduction: { type: String, required: true },
    experiencedetail: { type: String, required: true },
    knowledgeof: { type: String, required: true },
    jobdescription: { type: String },
    skillsrequired: { type: Array, required: true },
    jobtype: { type: Array, required: true },
    url: { type: String },
    embed_a_map: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobs", jobsSchema);
