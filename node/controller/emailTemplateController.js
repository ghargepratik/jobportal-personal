const EmailTemplate = require('../models/emailTemplateSchema.js')
const logger = require('../config/logger.js')
const setEmailTemplateDefaultData = async (req, res, next) => {
    try {
        const { template, type } = req.body
        if (!(template && type)) {
            return res.status(401).json('FILLED ALL INPUTS')
        }
        const exitstype = await EmailTemplate.findOne({ type: type })
        if (!exitstype) {
            const newEmailTemplate = await EmailTemplate.create({
                template,
                type,
            })
            return res.status(201).json({
                newEmailTemplate,
                message: 'New EmailTemplate Created',
            })
        } else {
            const updateEmailTemplate = await EmailTemplate.updateOne({
                template,
                type,
            })

            return res.status(201).json({
                updateEmailTemplate,
                message: ' EmailTemplate Updated',
            })
        }
    } catch (err) {
        logger.log('error', err.message)
        res.status(501).json('server err', err)
    }
}

const getEmailTemplateDefaultData = async (req, res, next) => {
    try {
        const allTemplate = await EmailTemplate.find()
        res.status(200).json({
            allTemplate,
            message: 'All templates',
        })
    } catch (err) {
        logger.log('error', err.message)
        res.status(501).json('server err', err)
    }
}

const updateEmailTemplateDefaultData = async (req, res, next) => {
    try {
        const id = req.params.templateid
        const updatedTemplate = await EmailTemplate.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            updatedTemplate,
            message: 'Template Updated',
        })
    } catch (err) {
        logger.log('error', err.message)
        res.status(501).json({ 'server err': err })
    }
}

module.exports = {
    setEmailTemplateDefaultData,
    getEmailTemplateDefaultData,
    updateEmailTemplateDefaultData,
}
