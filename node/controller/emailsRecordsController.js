const SendEmailRecordSchema=require("../models/sendEmailRecordSchema.js");


const getAllSendEmailRecords=async(req,res,next)=>{
    try{
        const list = await SendEmailRecordSchema.find();
        return res.status(200).json({
            list,
            message: 'All Sends Email Records',
        })
    }catch(err){
        console.log("🚀 ~ file: emailsRecordsController.js ~ line 12 ~ getAllSendEmailRecords ~ err", err)
        return res.status(500).json({
            message: err,
        })
    } 
}


const createSendEmailRecords=async(candidateEmail,candidateName,mailType) => {
    console.log("🚀 ~ file: emailsRecordsController.js ~ line 21 ~ createSendEmailRecords ~ candidateEmail", candidateEmail)
    console.log("🚀 ~ file: emailsRecordsController.js ~ line 21 ~ createSendEmailRecords ~ mailType", mailType)
    // console.log("🚀 ~ file: emailsRecordsController.js ~ line 21 ~ createSendEmailRecords ~ candidateName", candidateName)
    
    try{
        const sendEmailRecord=await SendEmailRecordSchema.create({
            candidateEmail,
            candidateName,
            mailType
        })
        console.log("🚀 ~ file: emailsRecordsController.js ~ line 25 ~ createSendEmailRecords ~ sendEmailRecord", sendEmailRecord)
    
        return sendEmailRecord
    }catch(err){
        console.log("🚀 ~ file: emailsRecordsController.js ~ line 29 ~ createSendEmailRecords ~ err", err)
        return err
    }
}

module.exports={getAllSendEmailRecords,createSendEmailRecords}