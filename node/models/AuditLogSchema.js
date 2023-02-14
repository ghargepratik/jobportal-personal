const mongoose = require("mongoose");

const allActivitiesSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    actionType: {
      type: String,
      enum: [
        1, // 1=>register action
        2, // 2=>login action
        // (job post)
        3, // 3=>Apply on Specifice job (job post)
        4, // 4=>Create Job action (when its admin)
        5, // 5=>Update Job action (when its admin)
        6, // 6=>Delete Job action (when its admin)
        // ( Job Application)
        7, // 7=>Schedule interview
        8, // 8=>comment on specific job application
      ],
      default: null,
    },
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: "jobs" },
    application_id: { type: mongoose.Schema.Types.ObjectId, ref: "appliedJob" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("allactiviti", allActivitiesSchema);
