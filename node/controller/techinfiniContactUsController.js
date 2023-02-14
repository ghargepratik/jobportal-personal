const ContactUs = require('../models/contactUsSchema.js')
const { validationResult } = require('express-validator')
const { mailEmitter } = require('../email/MailSender.js')
exports.techinfiniContactUs = async (req, res, next) => {
    try {
        console.log(req.body)
        const errors = validationResult(req)
        console.log(
            '🚀 ~ file: techinfiniContactUsController.js:8 ~ errors',
            errors
        )
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }

        const { username, email, phonenumber, message } = req.body

        const contactUs = await ContactUs.create({
            username,
            email,
            message,
        })
        console.log(
            '🚀 ~ file: techinfiniContactUsController.js:21 ~ contactUs',
            contactUs
        )

        mailEmitter.emit(
            'techinfini-contact-us',
            username,
            email,
            phonenumber,
            message
        )
        return res.status(201).json({
            message: 'Send Successfully',
            data: contactUs,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: techinfiniContactUsController.js:9 ~ error',
            error
        )
        return res
            .status(500)
            .json({ error: "Server error ,'Something went wrong'" })
    }
}
