const Applyjob = require('../models/applyjobSchema.js')
const SheduleInterview = require('../models/sheduleInterviewSchema.js')
const { mailEmitter } = require('../email/MailSender')
const { insertActivity } = require('./ActivityController')
const Comments = require('../models/commentSchema.js')

exports.interviewSchedule = async (req, res, next) => {
    console.log('interviewSchedule body', req.body)
    try {
        const {
            date,
            time,
            interviewername,
            intervieweremail,
            userid,
            singlejobapplicationid,
            status,
            interviewaddress,
        } = req.body
        if (
            !(
                date &&
                time &&
                userid &&
                singlejobapplicationid &&
                status &&
                interviewaddress
            )
        ) {
            return res.status(401).json('fill all inputs')
        }
        const appliedUser = await Applyjob.findOne({
            _id: singlejobapplicationid,
        })

        if (!appliedUser) {
            return res
                .status(409)
                .send('You are not applied for this job. Please Apply')
        }

        const candidateMail = appliedUser.email
        const interviewerMail = intervieweremail || ''
        const adminMail = process.env.ADMIN_MAIL
        const ToMails = candidateMail //[candidateMail, interviewerMail, adminMail]
        const candidateName = appliedUser.name
        const jobtitle = appliedUser.jobposttitle
        const address = interviewaddress

        const interviewShedule = await SheduleInterview.create({
            date,
            time,
            userid,
            intervieweremail: '',
            interviewername: '',
            singlejobapplicationid,
            status,
            interviewaddress,
        })
        console.log(
            '🚀 ~ file: scheduleController.js ~ line 38 ~ exports.interviewSchedule= ~ interviewShedule',
            interviewShedule
        )

        mailEmitter.emit(
            'sheduleInterviewMail',
            ToMails,
            candidateName,
            date,
            time,
            jobtitle,
            status,
            address
        )

        //UPDATE STATUS OF APPLICATION
        const updateStatusOfApplication = await Applyjob.findByIdAndUpdate(
            singlejobapplicationid,
            {
                $set: {
                    status: status,
                    scheduled_interview_id: interviewShedule._id,
                },
            },
            { new: true }
        )
        console.log(
            '🚀 ~ file: scheduleController.js ~ line 88 ~ exports.interviewSchedule= ~ updateStatusOfApplication',
            updateStatusOfApplication
        )

        insertActivity(req.adminid, 7, interviewShedule.singlejobapplicationid)

        const commentValue = `Your <strong>${status}</strong> will be on <strong>${date}</strong> and <strong>${time}</strong> at <strong>${interviewaddress}</strong>`

        await Comments.create({
            comment: commentValue,
            singlejobapplicationid: singlejobapplicationid,
        })

        return res.status(200).json({
            interviewShedule,
            message: 'Interview shedule',
            userInfo: updateStatusOfApplication,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send('server err', err)
    }
}
