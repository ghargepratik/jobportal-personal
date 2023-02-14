const mongoose = require("mongoose");

const sheduleInterviewSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    interviewername: { type: String},
    intervieweremail: { type: String },
    userid: { type: String, required: true }, //applied user id
    // singlejobapplicationid: { type: String, required: true },
    singlejobapplicationid: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "appliedJob",
      },
    ],
    //singlejobapplicationid
    status: {
      type: String,
      enum: [
        "First_Interview_Scheduled",
        "Second_Interview_Scheduled",
        "HR_Interview_Scheduled",
        "Hired",
        "Offered",
        "Joiningoffered",
        "Joined",
        "Rejected",
      ],
      default: "First_Interview_Scheduled",
    },
    interviewaddress:{type: String, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("sheduleinterview", sheduleInterviewSchema);
