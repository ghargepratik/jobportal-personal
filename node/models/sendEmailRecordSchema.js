const mongoose=require("mongoose");

const SendEmailRecords=new mongoose.Schema(
    {
        candidateName:{type:String,require:true},
        candidateEmail:{type:String,require:true},
        mailType:{type:String,require:true},
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("sendemailrecords",SendEmailRecords)