const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')
const EmailTemplate = require('../models/emailTemplateSchema.js')
const logger = require('../config/logger.js')
const EventEmitter = require('events').EventEmitter
const mailEmitter = new EventEmitter()
const {
    createSendEmailRecords,
} = require('../controller/emailsRecordsController.js')

mailEmitter.on(
    'sendJobApplyMail',
    async (ToMails, candidateName, jobPostTitle, applicationNumber) => {
        let type = 'applynow'
        const ApplyNowTemplate = await EmailTemplate.find({ type: type })
        const defaltJoiningDocEmailTemplate = ApplyNowTemplate[0].template
        let replaceCandidateName = defaltJoiningDocEmailTemplate.replaceAll(
            '{{CANDIDATENAME}}',
            candidateName
        )
        let replaceJobPostTitle = replaceCandidateName.replaceAll(
            '{{JOBTITLE}}',
            jobPostTitle
        )
        let replaceApplicationNumber = replaceJobPostTitle.replaceAll(
            '{{APPLICATIONNUMBER}}',
            applicationNumber
        )
        let SendEmailMessage = replaceApplicationNumber
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.ADMIN_MAIL}`,
                pass: `${process.env.ADMIN_PASS}`,
            },
        })

        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),
        }

        transporter.use('compile', hbs(handlebarOptions))
        var mailOptions = {
            from: `${process.env.SEND_MAIL_FROM}`,
            to: ToMails,
            subject: `Techinfini-${jobPostTitle}-${applicationNumber}`, //companyname-jobtitle-applicationId
            template: 'applyjobemail',
            context: {
                EMAILMESSAGE: SendEmailMessage,
            },
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                logger.log('error', error.message)
                return logger.log('error', error)
            }
            const emailRecord = createSendEmailRecords(
                ToMails,
                candidateName,
                'Applied Job'
            )
            console.log(
                '🚀 ~ file: MailSender.js ~ line 52 ~ emailRecord',
                emailRecord
            )
            logger.log('debug', `Job apply email sent to - ${ToMails}`)
        })
    }
)

mailEmitter.on(
    'sheduleInterviewMail',
    async (ToMails, candidateName, date, time, jobtitle, status, address) => {
        const type = 'interviewshedule'
        const interviewSheduleTemplate = await EmailTemplate.find({
            type: type,
        })
        const defaltJoiningDocEmailTemplate =
            interviewSheduleTemplate[0].template
        let replaceCandidateName = defaltJoiningDocEmailTemplate.replaceAll(
            '{{CANDIDATENAME}}',
            candidateName
        )
        let replaceDate = replaceCandidateName.replaceAll('{{DATE}}', date)
        let replaceTime = replaceDate.replaceAll('{{TIME}}', time)
        let replaceJobtitle = replaceTime.replaceAll('{{JOBTITLE}}', jobtitle)
        let replaceInterviewStatus = replaceJobtitle.replaceAll(
            '{{INTERVIEWSTATUS}}',
            status
        )
        let replaceAddress = replaceInterviewStatus.replaceAll(
            '{{ADDRESS}}',
            address
        )
        let SendEmailMessage = replaceAddress

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.ADMIN_MAIL}`,
                pass: `${process.env.ADMIN_PASS}`,
            },
        })

        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),
        }

        transporter.use('compile', hbs(handlebarOptions))
        var mailOptions = {
            from: `${process.env.SEND_MAIL_FROM}`,
            to: ToMails,
            subject: 'Interview Shedule !',
            template: 'email',
            context: {
                EMAILMESSAGE: SendEmailMessage,
            },
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                logger.log('error', error.message)
                return console.log(error)
            }
            const emailRecord = createSendEmailRecords(
                ToMails,
                candidateName,
                'Interview Schedule'
            )
            console.log(
                '🚀 ~ file: MailSender.js ~ line 102 ~ emailRecord',
                emailRecord
            )

            logger.log('debug', `Schedule interview candidates - ${ToMails} `)
        })
    }
)

//SEND FORGET PASSWORD MAIL
mailEmitter.on(
    'sendForgetPasswordMail',
    (candidateName, email, redirecturl) => {
        // console.log("🚀 ~ file: MailSender.js ~ line 105 ~ mailEmitter.on ~ redirecturl", redirecturl,email)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.ADMIN_MAIL}`,
                pass: `${process.env.ADMIN_PASS}`,
            },
        })
        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),
        }
        transporter.use('compile', hbs(handlebarOptions))

        var mailOptions = {
            from: `${process.env.SEND_MAIL_FROM}`,
            to: email,
            subject: `Techinfini Resetpassword`,
            template: 'resetpasswordmail',
            context: {
                CANDIDATENAME: candidateName,
                EMAIL: email,
                RESETURL: redirecturl,
            },
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                logger.log('error', error.message)
                return console.log(error)
            }
            const emailRecord = createSendEmailRecords(
                email,
                candidateName,
                'Forgot Passsword'
            )
            console.log(
                '🚀 ~ file: MailSender.js ~ line 145 ~ emailRecord',
                emailRecord
            )
            logger.log('debug', `Reset Password Mail sent ${email}`)
        })
    }
)

//SEND LOGIN DETAILS
mailEmitter.on(
    'sendLoginDetails',
    (candidateName, email, password = 'jobportal@user1234') => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.ADMIN_MAIL}`,
                pass: `${process.env.ADMIN_PASS}`,
            },
        })
        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),
        }
        transporter.use('compile', hbs(handlebarOptions))

        var mailOptions = {
            from: `${process.env.SEND_MAIL_FROM}`,
            to: email,
            subject: 'Login Details !',
            template: 'logindetail',
            context: {
                CANDIDATENAME: candidateName,
                EMAIL: email,
                PASSWORD: password,
            },
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                logger.log('error', error.message)
                return console.log(error)
            }
            logger.log('debug', `App Login Details sent ${email}`)
        })
    }
)

mailEmitter.on(
    'sendJoiningDocumentMail',
    async (ToMails, candidateName, jobPostTitle, companyname, joiningdate) => {
        console.log(
            'sendJoiningDocumentMail',
            ToMails,
            candidateName,
            jobPostTitle,
            companyname,
            joiningdate
        )
        let type = 'joiningdocument'
        const JoiningDocumentTemplate = await EmailTemplate.find({ type: type })
        const defaltJoiningDocEmailTemplate =
            JoiningDocumentTemplate[0].template
        let replaceCandidateName = defaltJoiningDocEmailTemplate.replaceAll(
            '{{CANDIDATENAME}}',
            candidateName
        )
        let replaceJobPostTitle = replaceCandidateName.replaceAll(
            '{{JOBTITLE}}',
            jobPostTitle
        )
        let replaceCompanyName = replaceJobPostTitle.replaceAll(
            '{{COMPANYNAME}}',
            companyname
        )
        let replaceJoiningdate = replaceJobPostTitle.replaceAll(
            '{{JOININGDATE}}',
            joiningdate
        )
        let SendEmailMessage = replaceJoiningdate
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.ADMIN_MAIL}`,
                pass: `${process.env.ADMIN_PASS}`,
            },
        })
        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),
        }
        transporter.use('compile', hbs(handlebarOptions))
        var mailOptions = {
            from: `${process.env.SEND_MAIL_FROM}`,
            to: ToMails,
            subject: 'Joning Document !',
            template: 'joiningdocument',
            context: {
                EMAILMESSAGE: SendEmailMessage,
            },
        }
        transporter.sendMail(mailOptions, function (error, info) {
            console.log('info', info)
            if (error) {
                return console.log(error)
            }
            const emailRecord = createSendEmailRecords(
                ToMails,
                candidateName,
                'Required Joining Documents'
            )
            console.log(
                '🚀 ~ file: MailSender.js ~ line 230 ~ emailRecord',
                emailRecord
            )
            logger.log(
                'debug',
                `Send email for joining document to - ${ToMails}`
            )
        })
    }
)

mailEmitter.on(
    'sendOfferLetterMail',
    async (
        filename,
        filepath,
        candidatedEmail,
        offerCtc,
        joiningdate,
        candidateName,
        jobPostTitle
    ) => {
        // console.log("mail offer input",filename, filepath, candidatedEmail,"offerCtc",offerCtc,"joiningdate",joiningdate,"candidateName",candidateName,"jobTitle",jobPostTitle);

        let documentPathValue = `${process.env.DOMAIN_URL}${filepath}`

        let type = 'offerletter'
        const OfferLetterTemplate = await EmailTemplate.find({ type: type })
        const defaltOfferLetterTemplate = OfferLetterTemplate[0].template

        // console.log("defaltOfferLetterTemplate",defaltOfferLetterTemplate);
        let replaceCandidateName = defaltOfferLetterTemplate.replaceAll(
            '{{CANDIDATENAME}}',
            candidateName
        )
        let replaceJobPostTitle = replaceCandidateName.replaceAll(
            '{{JOBTITLE}}',
            jobPostTitle
        )
        let replaceJoiningdate = replaceJobPostTitle.replaceAll(
            '{{JOININGDATE}}',
            joiningdate
        )
        let replaceDocumentLink = replaceJoiningdate.replaceAll(
            '{{DOCUMENTLINK}}',
            documentPathValue
        )
        let replaceCTC = replaceDocumentLink.replaceAll('{{CTC}}', offerCtc)
        let SendEmailMessage = replaceCTC

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.ADMIN_MAIL}`,
                pass: `${process.env.ADMIN_PASS}`,
            },
        })

        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),
        }
        transporter.use('compile', hbs(handlebarOptions))
        var mailOptions = {
            from: `${process.env.SEND_MAIL_FROM}`,
            to: candidatedEmail,
            subject: 'Offer Letter!',
            template: 'offerletter',
            context: {
                EMAILMESSAGE: SendEmailMessage,
            },
            // attachments: [{ filename: filename, path:pathValue}],
        }
        transporter.sendMail(mailOptions, function (error, info) {
            console.log('info', info)
            if (error) {
                return console.log('send mail fail', error)
            }

            const emailRecord = createSendEmailRecords(
                ToMails,
                candidateName,
                'Offer Letter'
            )
            console.log(
                '🚀 ~ file: MailSender.js ~ line 286 ~ emailRecord',
                emailRecord
            )
        })
    }
)
mailEmitter.on(
    'sendJoiningLetterMail',
    async (
        filename,
        filepath,
        candidatedEmail,
        offerCtc,
        joiningdate,
        candidateName,
        jobPostTitle
    ) => {
        // console.log("mail offer input",filename, filepath, candidatedEmail,"offerCtc",offerCtc,"joiningdate",joiningdate,"candidateName",candidateName,"jobTitle",jobPostTitle);

        let documentPathValue = `${process.env.DOMAIN_URL}${filepath}`

        let type = 'offerletter' //SAME FOR JOINING LETTER ALSO
        const OfferLetterTemplate = await EmailTemplate.find({ type: type })
        const defaltOfferLetterTemplate = OfferLetterTemplate[0].template

        // console.log("defaltOfferLetterTemplate",defaltOfferLetterTemplate);
        let replaceCandidateName = defaltOfferLetterTemplate.replaceAll(
            '{{CANDIDATENAME}}',
            candidateName
        )
        let replaceJobPostTitle = replaceCandidateName.replaceAll(
            '{{JOBTITLE}}',
            jobPostTitle
        )
        let replaceJoiningdate = replaceJobPostTitle.replaceAll(
            '{{JOININGDATE}}',
            joiningdate
        )
        let replaceDocumentLink = replaceJoiningdate.replaceAll(
            '{{DOCUMENTLINK}}',
            documentPathValue
        )
        let replaceCTC = replaceDocumentLink.replaceAll('{{CTC}}', offerCtc)
        let SendEmailMessage = replaceCTC

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.ADMIN_MAIL}`,
                pass: `${process.env.ADMIN_PASS}`,
            },
        })

        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),
        }
        transporter.use('compile', hbs(handlebarOptions))
        var mailOptions = {
            from: `${process.env.SEND_MAIL_FROM}`,
            to: candidatedEmail,
            subject: 'Joining Letter!',
            template: 'offerletter',
            context: {
                EMAILMESSAGE: SendEmailMessage,
            },
            // attachments: [{ filename: filename, path:pathValue}],
        }
        transporter.sendMail(mailOptions, function (error, info) {
            console.log('info', info)
            if (error) {
                return console.log('send mail fail', error)
            }
            const emailRecord = createSendEmailRecords(
                ToMails,
                candidateName,
                'Joinining Letter'
            )
            console.log(
                '🚀 ~ file: MailSender.js ~ line 341 ~ emailRecord',
                emailRecord
            )
        })
    }
)

// mailEmitter.on('sendOfferLetterMail', (filename, filepath, candidatedEmail) => {
//     console.log("mail offer input",filename, filepath, candidatedEmail);

//     let pathValue=`${process.env.DOMAIN_URL}${filepath}`

//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: `${process.env.ADMIN_MAIL}`,
//             pass: `${process.env.ADMIN_PASS}`,
//         },
//     })

//     const handlebarOptions = {
//         viewEngine: {
//             partialsDir: path.resolve('./views/'),
//             defaultLayout: false,
//         },
//         viewPath: path.resolve('./views/'),
//     }
//     transporter.use('compile', hbs(handlebarOptions))
//     var mailOptions = {
//         from: `${process.env.SEND_MAIL_FROM}`,
//         to: candidatedEmail,
//         subject: 'Welcome!',
//         attachments: [{ filename: filename, path:pathValue ? pathValue :''}],
//         template: 'offerletter',
//     }
//     transporter.sendMail(mailOptions, function (error, info) {
//         console.log("info",info);
//         if (error) {
//             return console.log("send mail fail",error)
//         }
//     })
// })

/**********************Techinfini Contact Us ******************************** */
mailEmitter.on(
    'techinfini-contact-us',
    async (username, useremail, userphonenumber, message) => {
        console.log(
            'mail Contact Us input',
            username,
            useremail,
            userphonenumber,
            message
        )

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.ADMIN_MAIL}`,
                pass: `${process.env.ADMIN_PASS}`,
            },
        })

        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),
        }
        transporter.use('compile', hbs(handlebarOptions))
        var mailOptions = {
            from: `${process.env.SEND_MAIL_FROM}`,
            to: `${process.env.CONTACTUS_ADMIN_MAIL}`,
            subject: 'Techinfini Contact Us',
            template: 'contactus',
            context: {
                USERNAME: username,
                USEREMAIL: useremail,
                USERPHONENUMBER: userphonenumber,
                MESSAGE: message,
            },
            // attachments: [{ filename: filename, path:pathValue}],
        }
        transporter.sendMail(mailOptions, function (error, info) {
            console.log('info', info)
            if (error) {
                return console.log('CONTACT US send mail fail', error)
            }
            // const emailRecord= createSendEmailRecords(ToMails,candidateName,"Joinining Letter")
            // console.log("🚀 ~ file: MailSender.js ~ line 341 ~ emailRecord", emailRecord)
        })
    }
)
module.exports = {
    mailEmitter,
}
