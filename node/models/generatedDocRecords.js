const mongoose=require("mongoose");

const GeneratedDocRecords=new mongoose.Schema(
    {
        actionType:{type:String,require:true},
        documentUrl:{
            type:String,require:true
        },
        application_id: { type: mongoose.Schema.Types.ObjectId, ref: "appliedJob" },
    },
    {
      timestamps: true,
    }
)

module.exports = mongoose.model("generateddocument", GeneratedDocRecords);

// const GenerateDocumentsRecord=new mongoose.Schema(
//     {
//         documentUrl:{
//             type:String,require:true
//         },
//         applicationId:{type: mongoose.Schema.Types.ObjectId, ref:"appliedJob"}
//     },
//     {
//         timestamps: true,
//     }
// )

// module.exports= mongoose.model("generatedocumentrecords",GenerateDocumentsRecord)