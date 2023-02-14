const AuditLog = require('../models/AuditLogSchema.js')

const getLogs = async (req, res, next) => {
    try {
        const list = await AuditLog.find().populate('userid').populate('job_id').populate('application_id')

        return res.status(200).json({
            list,
            message: 'All activities list',
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err,
        })
    }
}

const insertActivity = async (userid, actionType, actionOn = null) => {
   
    try {
        let inserted = ''
        if ([7, 8].includes(actionType)) {
            let application_id = actionOn
            inserted = await AuditLog.create({
                userid,
                actionType,
                application_id,
            })
            
        } else if ([3, 4, 5, 6].includes(actionType)) {
            console.log('actionOn', actionOn)
            let job_id = actionOn
            inserted = await AuditLog.create({
                userid,
                actionType,
                job_id,
            })
            
        } else {
            inserted = await AuditLog.create({
                userid,
                actionType,
            })
        }
        return inserted
    } catch (err) {
        console.log(err)
    }
}

module.exports = { insertActivity, getLogs }
