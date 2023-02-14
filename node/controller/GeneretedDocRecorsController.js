const GeneratedDocRecord = require('../models/generatedDocRecords.js')

const getAllGeneratedDocRecords = async (req, res, next) => {
    try {
        const list = await GeneratedDocRecord.find().populate('application_id')

        return res.status(200).json({
            list,
            message: 'All Generated Document Docs',
        })
    } catch (err) {
        console.log("🚀 ~ file: GeneretedDocRecorsController.js ~ line 12 ~ getAllGeneratedDocRecords ~ err", err)
        return res.status(500).json({
            message: err,
        })
    }
}



const insertGeneratedDocRecord=async(actiontype,filepath,applicationId)=>{
    // console.log("🚀 GeneretedDocRecorsController.js ~ line 21 ~ insertGeneratedDocRecord ~ filepath", filepath,"applicationId",applicationId)

    try{
        
        // const documentURL=`${process.env.DOMAIN_URL}${filepath}`
           

            const addDocRecord=await GeneratedDocRecord.create({
                actionType:actiontype,
                documentUrl:filepath,
                application_id:applicationId
            })
            // console.log("🚀 ~ file: GeneretedDocRecorsController.js ~ line 33 ~ insertGeneratedDocRecord ~ addDocRecord", addDocRecord)

            return addDocRecord
    }catch(err){
        console.log("🚀 ~ file: GeneretedDocRecorsController.js ~ line 27 ~ insertGeneratedDocRecord ~ err", err)
        return err
    }
}


module.exports = { insertGeneratedDocRecord, getAllGeneratedDocRecords }
