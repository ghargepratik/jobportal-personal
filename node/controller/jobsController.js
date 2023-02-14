const fs = require('fs')
var path = require('path')
const ejs = require('ejs')
const pdf = require('html-pdf')
const { validationResult } = require('express-validator')
const Jobs = require('../models/jobsSchema.js')
const Applyjob = require('../models/applyjobSchema.js')
const Comments = require('../models/commentSchema.js')
const Letter = require('../models/LetterSchema.js')
const Admin = require('../models/adminSchema.js') //admin Schema
const EmailTemplate = require('../models/emailTemplateSchema.js')
const { insertActivity } = require('./ActivityController')
const { mailEmitter } = require('../email/MailSender.js')
const { adminRegister } = require('./adminController.js')
const logger = require('../config/logger.js')
const APIFeatures = require('../utility/apiFeatures')
const convertedName = require('../utility/convertFileName.js')
const {
    insertGeneratedDocRecord,
} = require('./GeneretedDocRecorsController.js')

const countTotalDocumentForDashboard = async (req, res, next) => {
    try {
        const totalJobs = await Jobs.count()
        const totalJobApplication = await Applyjob.count()
        return res.status(200).json({
            totalJobs: totalJobs,
            totalJobApplication: totalJobApplication,
        })
    } catch (err) {
        loggers.log('error', error.message)
        return res.status(500).json({
            message: err,
        })
    }
}

const createJobs = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const {
            companyname,
            tagline,
            email,
            linkdin,
            facebook,
            twitter,
            jobtitle,
            experience_from,
            experience_to,
            joblocation,
            rate,
            eduction,
            experiencedetail,
            knowledgeof,
            jobdescription,
            skillsrequired,
            jobtype,
            embed_a_map,
        } = req.body

        let url = null
        if (req.file?.filename) {
            url = `/public/company-logo/${req.file.filename}`
        } else {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Please upload file' }] })
        }

        const jobtypeString = jobtype
        const jobtypeArray = jobtypeString.split(',')
        const skillsrequiredString = skillsrequired
        const skillsrequiredArray = skillsrequiredString.split(',')
        const adminId = req.adminid
        const job = await Jobs.create({
            adminId,
            companyname,
            tagline,
            email,
            linkdin,
            facebook,
            twitter,
            jobtitle,
            experience_from,
            experience_to,
            joblocation,
            rate,
            eduction,
            experiencedetail,
            knowledgeof,
            jobdescription,
            skillsrequired: skillsrequiredArray,
            jobtype: jobtypeArray,
            url,
            embed_a_map,
        })
        const activity = await insertActivity(job.adminId, 4, job._id) //4=>Create job action
        return res.status(200).json({
            job,
            message: 'Job Post Created',
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err,
        })
    }
}

const getAdminjobsById = async (req, res, next) => {
    try {
        // const adminId = req.adminid
        const adminJob = await Jobs.find()
        res.status(200).json(adminJob)
    } catch (err) {
        res.status(501).send('server err', err)
    }
}

const getAdminSingleJobByJobId = async (req, res, next) => {
    try {
        const id = req.params.jobid
        if (!id) {
            return res.status(403).send("to access this route need job's Id")
        }
        const job = await Jobs.findById(id)
        res.status(200).json(job)
    } catch (err) {
        return res.status(500).json({
            message: err,
        })
    }
}

const updateAdminSingleJobByJobId = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const id = req.params.jobid
        if (req?.file?.filename)
            req.body.url = `/public/company-logo/${req.file.filename}`
        const { skillsrequired, jobtype, ...others } = req.body
        const jobtypeString = jobtype
        const jobtypeArray = jobtypeString.split(',')
        const skillsrequiredString = skillsrequired
        const skillsrequiredArray = skillsrequiredString.split(',')
        const newUpdatedJob = await Jobs.findByIdAndUpdate(
            id,
            {
                skillsrequired: skillsrequiredArray,
                jobtype: jobtypeArray,
                ...others,
            },
            {
                new: true,
            }
        )

        const activity = insertActivity(
            newUpdatedJob.adminId,
            5,
            newUpdatedJob._id
        )

        return res
            .status(200)
            .json({ updated: newUpdatedJob, message: 'Job Post Updated' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err,
        })
    }
}

const updateAdminSingleJobStatusByJobId = async (req, res, next) => {
    try {
        const id = req.params.jobid

        const newUpdatedJob = await Jobs.findByIdAndUpdate(id, req.body, {
            new: true,
        })

        return res
            .status(200)
            .json({ updated: newUpdatedJob, message: 'Job Post Updated' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err,
        })
    }
}

const deleteAdminSingleJobByJobId = async (req, res, next) => {
    try {
        const id = req.params.jobid
        const deleteJob = await Jobs.findByIdAndDelete(id)

        //reading user activities
        const activity = insertActivity(deleteJob.adminId, 6, deleteJob._id) //6=>Delete job action

        res.status(200).json('job Deleted')
    } catch (err) {
        return res.status(500).json({
            message: err,
        })
    }
}

const getJobDetailsById = async (req, res, next) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(403).send('to access this route need Id')
        }

        const job = await Jobs.findById(id)

        res.status(200).json(job)
    } catch (err) {
        return res.status(500).json({
            message: err,
        })
    }
}

const aliasTopJobs = (req, res, next) => {
    req.query.limit = req.query.limit || '4'
    req.query.sort = '-updatedAt'
    req.query.fields =
        'url,createdAt,updatedAt,jobtype,jobtitle,companyname,jobstatus,joblocation'
    next()
}

//GET ALL JOBS
const getJobs = async (req, res, next) => {
    try {
        const features = new APIFeatures(
            Jobs.find({ jobstatus: true }),
            req.query
        )
            .limitFields()
            .sort()
            .paginate()
        const job = await features.query
        const total = await Jobs.find({ jobstatus: true }).count()
        return res.status(200).json({
            status: 'Success',
            totaldocument: total,
            job,
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        })
    }

    // try {
    // try {
    //     if (req.query.page || req.query.limit) {
    //         const page = req.query.page * 1
    //         const limit = req.query.limit * 1
    //         const startIndex = (page - 1) * limit
    //         const endIndex = page * limit
    //         const jobss = await Jobs.find({ jobstatus: true }).sort({
    //             updatedAt: -1,
    //         })
    //         if (endIndex < jobss.length) {
    //             jobss.next = {
    //                 page: page + 1,
    //                 limit: limit,
    //             }
    //         }
    //         if (startIndex > 0) {
    //             jobss.previous = {
    //                 page: page - 1,
    //                 limit: limit,
    //             }
    //         }
    //         let job = jobss.slice(startIndex, endIndex)
    //         let totalDoc = jobss.length
    //         return res.status(200).json({
    //             job,
    //             totaldocument: totalDoc,
    //         })
    //     } else {
    //         const job = await Jobs.find({ jobstatus: true }).sort({
    //             updatedAt: -1,
    //         })
    //         let totalDoc = await job.length
    //         const total = await Jobs.count()
    //         return res.status(200).json({
    //             job,
    //             totaldocument: totalDoc,
    //         })
    //     }
    // } catch (err) {
    //     logger.log('error', err.message)
    //     return res.status(500).json({
    //         message: err,
    //     })
    // }
}

//GET RECENT JOBS
const getRecntsJobs = async (req, res, next) => {
    try {
        const currentJobId = req.params.currentJobId //THIS IS OPEN ON JOB-INDEX PAGE

        const features = new APIFeatures(
            Jobs.find({ _id: { $ne: currentJobId }, jobstatus: true }),
            req.query
        )
            .limitFields()
            .sort()
            .paginate()
        const job = await features.query
        const total = (await Jobs.find({ jobstatus: true }).count()) - 1 //(-1)of currentJobId for pagination

        return res.status(200).json({
            status: 'Success',
            totaldocument: total,
            job,
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        })
    }
}

const applyjobController = async (req, res, next) => {
    try {
        console.log('req.body', req.body)
        logger.log('debug', '---inside apply job----')
        const filePath = '/public/resumes/'
        console.log(
            '🚀 ~ file: jobsController.js ~ line 313 ~ applyjobController ~ filename',
            req.file?.filename
        )
        const fileName = req.file?.filename

        if (!fileName) throw Error('Please select file')
        const ext = fileName.split('.').at(-1)
        let url = `${fileName}`
        console.log('url', url)

        const {
            jobid,
            jobposttitle,
            name,
            email,
            phonenumber,
            experience,
            currentctc,
            expectedctc,
            status,
        } = req.body
        if (
            !(
                jobid &&
                jobposttitle &&
                name &&
                email &&
                phonenumber &&
                experience &&
                currentctc &&
                expectedctc &&
                url
            )
        ) {
            return res.status(500).json({
                message: 'Please Fill All Fields',
            })
        }

        console.log(' applyJob email>>>>>>>>>>.', email)

        const existsUser = await Admin.findOne({ email })
        let createdUser = {}
        if (!existsUser) {
            req.apply_job = true
            createdUser = await adminRegister(req, res)
            // mailEmitter.emit('sendLoginDetails', name, createdUser.email)               //sir said not send login details mail
        }
        const applicationNumber = Math.floor(
            new Date().valueOf() * Math.random()
        )
        const user = await Applyjob.create({
            jobid,
            jobposttitle,
            userid: existsUser ? existsUser._id : createdUser._id,
            name,
            email,
            phonenumber,
            experience,
            currentctc,
            expectedctc,
            url,
            status,
            applicationNumber,
        })
        console.log('user', user)
        insertActivity(user.userid, 3, jobid)
        mailEmitter.emit(
            'sendJobApplyMail',
            email,
            name,
            jobposttitle,
            applicationNumber
        )

        const appliedUser = await Admin.findById(user.userid)
        appliedUser.appliedjobsid.push(jobid)
        await appliedUser.save()
        console.log(
            '🚀 ~ file: jobsController.js ~ line 382 ~ applyjobController ~ appliedUser',
            appliedUser
        )

        logger.log('debug', `Job applied successfuly by - ${email}`)
        res.status(200).json({ message: 'job apply successfuly', data: user })
    } catch (err) {
        logger.log('error', err.message)
        return res.status(400).json({
            status: 'fail',
            message: err.message,
        })
    }
}

const getAllUserAppliedOnJobApplication = async (req, res, next) => {
    try {
        console.log('req.query.type', req.query)
        let user = []
        if (req.query.type && req.query.status) {
            user = await Applyjob.find({
                jobposttitle: req.query.type,
                status: req.query.status,
            }).sort({
                updatedAt: -1,
            })
        } else if (req.query.type) {
            console.log('type')
            user = await Applyjob.find({
                jobposttitle: req.query.type,
            }).sort({
                updatedAt: -1,
            })
        } else if (req.query.status) {
            user = await Applyjob.find({
                status: req.query.status,
            }).sort({
                updatedAt: -1,
            })
        } else {
            user = await Applyjob.find().sort({
                updatedAt: -1,
            })
        }
        return res.json({
            status: 200,
            user,
        })
    } catch (err) {
        return res.status(500).json({
            message: 'Something Went Wrong',
        })
    }
}

const getJobApplicationOfSingleUser = async (req, res, next) => {
    try {
        const id = req.params._id
        const userInfo = await Applyjob.findById(id)
        res.json({
            status: 200,
            userInfo,
        })
    } catch (err) {
        return res.status(500).json({
            message: err,
        })
    }
}

const updateJobApplicationOfSingleUser = async (req, res, next) => {
    try {
        const id = req.params._id
        console.log(id, 'userIdddd')
        console.log(req.body, 'body')

        const userInfo = await Applyjob.findByIdAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true }
        )
        res.json({
            status: 200,
            userInfo,
            message: 'upsate success',
        })
    } catch (err) {
        return res.status(500).json({
            message: err,
        })
    }
}

const sendJoiningDocumantationMail = async (req, res, next) => {
    try {
        const id = req.params._id
        const userInfo = await Applyjob.findById(id)
            .populate('jobid')
            .populate('offer_latter_id')
        // console.log("userInfo",userInfo)

        if (!userInfo?.offer_latter_id) {
            return res
                .status(422)
                .json({ message: 'Please Generate Offer Letter First' })
        }

        d = new Date(userInfo?.offer_latter_id?.joining_date)
        const date_joining =
            d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()

        const { email, name, jobposttitle, jobid } = userInfo

        const { companyname } = userInfo?.jobid

        if (email && name && jobposttitle && companyname) {
            mailEmitter.emit(
                'sendJoiningDocumentMail',
                email,
                name,
                jobposttitle,
                companyname,
                date_joining
            )
        }
        res.json({
            status: 200,
            message: 'Email Send',
        })
    } catch (err) {
        logger.log('error', err.message)
        return res.status(500).json({
            message: err,
        })
    }
}

const jobApplicationPostComments = async (req, res, next) => {
    try {
        const filesArray = []
        req.files.forEach((element) => {
            const commemtfiles = {
                url: element.path,
            }
            filesArray.push(commemtfiles)
        })

        if (!req.body.comment) {
            return res.status(401).json({
                message: 'Please write comment ',
            })
        }

        const cmt = new Comments({
            comment: req.body.comment,
            singlejobapplicationid: req.body.singlejobapplicationid,
            files: filesArray,
        })

        await cmt.save()

        const adminId = req.adminid
        const activity = insertActivity(adminId, 8, cmt.singlejobapplicationid) //8=>Comment on jobApplication action

        res.json({
            cmt,
            status: 201,
            message: 'Comment posted!',
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err,
        })
    }
}

const jobApplicationGetComments = async (req, res, next) => {
    try {
        const applicationId = req.params.singlejobapplicationid
        const cmts = await Comments.find({
            singlejobapplicationid: applicationId,
        })
        return res.json({
            cmts,
            status: 200,
            message: 'All comments',
        })
    } catch (err) {
        return res.status(500).json({
            message: err,
        })
    }
}

//GENERATE OFFER LETTER COntroller
const generateOfferLetter = async (req, res, next) => {
    try {
        const {
            joiningdate,
            bondperiod,
            specialinstruction,
            bondcondition,
            singlejobapplicationid,
            ctc,
        } = req.body
        const jobApplicationInfo = await Applyjob.find({
            _id: singlejobapplicationid,
        }).populate('jobid')
        // console.log("🚀 ~ file: jobsController.js ~ line 617 ~ generateOfferLetter ~ jobApplicationInfo", jobApplicationInfo)

        const offTemplate = await EmailTemplate.find({ type: 'offerletter' })
        const defaltJoiningDocEmailTemplate = offTemplate[0].template
        let replaceCandidateName = defaltJoiningDocEmailTemplate.replaceAll(
            '{{CANDIDATENAME}}',
            jobApplicationInfo[0]?.name
        )

        let replaceJoiningDate = replaceCandidateName.replaceAll(
            '{{JOININGDATE}}',
            joiningdate
        )
        let replaceJobtitle = replaceJoiningDate.replaceAll(
            '{{JOBTITLE}}',
            jobApplicationInfo[0]?.jobposttitle
        )
        let replaceCTC = replaceJobtitle.replaceAll('{{CTC}}', ctc)
        let replaceBondPeriod = replaceCTC.replaceAll(
            '{{BONDPERIOD}}',
            bondperiod
        )
        const TemplateData = replaceBondPeriod

        const data = {
            font: {
                color: 'green',
                include:
                    'https://api.****.com/parser/v3/css/combined?face=Kruti%20Dev%20010,Calibri,DevLys%20010,Arial,Times%20New%20Roman',
            },
            testData: [
                {
                    name: `<p><span class=\"T1\" style=\"font-family:'DevLys 010'; margin: 0;\">${TemplateData}</span></p>`,
                },
            ],
        }

        let base_path = __basedir
        const filePathName = path.resolve(
            base_path + '/views/pdf',
            'htmltopdf.ejs'
        )
        const htmlString = fs.readFileSync(filePathName).toString()
        let options = { format: 'Letter' }
        const ejsData = ejs.render(htmlString, data)
        let uniqueNo = Math.floor(new Date().valueOf() * Math.random())
        let pdfName = `techinfini-offerletter${uniqueNo}.pdf`
        // console.log('>>>>>>>>>>>>>>>>>>>', ejsData)

        await pdf
            .create(ejsData, options)
            .toFile(`public//offerletter//${pdfName}`, (err, response) => {
                if (err) return console.log('while creating pdf', err)
                return response
            })

        const filePathUrl = `/public/offerletter/${pdfName}`
        const letter = await Letter.create({
            ctc,
            joining_date: joiningdate,
            company_name: 'Techinfini', //jobApplicationInfo[0].jobid.companyname
            bond_period: bondperiod,
            bond_condition: bondcondition,
            special_instruction: specialinstruction,
            file_path_url: filePathUrl,
        })

        const updateJpbApplicationStatus = await Applyjob.findByIdAndUpdate(
            { _id: singlejobapplicationid },
            { status: 'Offered', offer_latter_id: letter._id },
            { new: true }
        )
        console.log(
            '🚀 ~ file: jobsController.js ~ line 650 ~ generateOfferLetter ~ updateJpbApplicationStatus',
            updateJpbApplicationStatus
        )

        setTimeout(() => {
            mailEmitter.emit(
                'sendOfferLetterMail',
                pdfName,
                filePathUrl,
                updateJpbApplicationStatus.email,
                ctc,
                joiningdate,
                jobApplicationInfo[0]?.name, //candidateName
                jobApplicationInfo[0]?.jobposttitle //jobTitle
            )
        }, 1000)

        //ADDED TO GENERATE DOCUMENT RECORDS
        const record = insertGeneratedDocRecord(
            'OfferLetter',
            filePathUrl,
            singlejobapplicationid
        )
        console.log(
            '🚀 ~ file: jobsController.js ~ line 707 ~ generateOfferLetter ~ record',
            record
        )

        return res.status(200).json({
            data: letter,
            message: 'Offer Letter Send !',
        })
    } catch (err) {
        logger.log('Error processing request offer latter: ' + err)
        return res.status(500).json({
            message: err,
        })
    }
}

//GENERATE JOINING LETTER COntroller
const generateLetter = async (req, res, next) => {
    try {
        const {
            joiningdate,
            bondperiod,
            specialinstruction,
            bondcondition,
            singlejobapplicationid,
            ctc,
        } = req.body

        const jobApplicationInfo = await Applyjob.find({
            _id: singlejobapplicationid,
        }).populate('jobid')
        // console.log("jobApplicationInfo",jobApplicationInfo)

        const interviewSheduleTemplate = await EmailTemplate.find({
            type: 'offerletter',
        })
        const defaltJoiningDocEmailTemplate =
            interviewSheduleTemplate[0].template
        let replaceCandidateName = defaltJoiningDocEmailTemplate.replaceAll(
            '{{CANDIDATENAME}}',
            jobApplicationInfo[0]?.name
        )
        let replaceJoiningDate = replaceCandidateName.replaceAll(
            '{{JOININGDATE}}',
            joiningdate
        )
        let replaceJobtitle = replaceJoiningDate.replaceAll(
            '{{JOBTITLE}}',
            jobApplicationInfo[0]?.jobposttitle
        )
        let replaceCTC = replaceJobtitle.replaceAll('{{CTC}}', ctc)
        let replaceBondPeriod = replaceCTC.replaceAll(
            '{{BONDPERIOD}}',
            bondperiod
        )
        const data = {
            font: {
                color: 'green',
                include:
                    'https://api.****.com/parser/v3/css/combined?face=Kruti%20Dev%20010,Calibri,DevLys%20010,Arial,Times%20New%20Roman',
            },
            testData: [
                {
                    name: `<p><span class=\"T1\" style=\"font-family:'DevLys 010'; margin: 0;\">${replaceBondPeriod}</span></p>`,
                },
            ],
        }

        let base_path = __basedir
        const filePathName = path.resolve(
            base_path + '/views/pdf',
            'htmltopdf.ejs'
        )
        const htmlString = fs.readFileSync(filePathName).toString()
        let options = { format: 'Letter' }
        const ejsData = ejs.render(htmlString, data)
        let uniqueNo = Math.floor(new Date().valueOf() * Math.random())

        let pdfName = `techinfini-joiningletter${uniqueNo}.pdf`
        await pdf
            .create(ejsData, options)
            .toFile(`public//joiningletter//${pdfName}`, (err, response) => {
                if (err) return console.log(err)
                return response
            })
        const filePathUrl = `/public/joiningletter/${pdfName}`
        const letter = await Letter.create({
            ctc,
            joining_date: joiningdate,
            company_name: 'Techinfini', //jobApplicationInfo[0].jobid.companyname
            bond_period: bondperiod,
            bond_condition: bondcondition,
            special_instruction: specialinstruction,
            file_path_url: filePathUrl,
        })

        const updateJpbApplicationStatus = await Applyjob.findByIdAndUpdate(
            { _id: singlejobapplicationid },
            { status: 'Joined', offer_latter_id: letter._id },
            { new: true }
        )
        console.log(
            '🚀 ~ file: jobsController.js ~ line 765 ~ generateLetter ~ updateJpbApplicationStatus',
            updateJpbApplicationStatus
        )
        // await updateJpbApplicationStatus.save()
        mailEmitter.emit(
            'sendJoiningLetterMail',
            pdfName,
            filePathUrl,
            updateJpbApplicationStatus.email,
            ctc,
            joiningdate,
            jobApplicationInfo[0]?.name, //candidateName
            jobApplicationInfo[0]?.jobposttitle //jobTitle
        )

        //ADDED TO GENERATE DOCUMENT RECORDS
        const record = insertGeneratedDocRecord(
            'OfferLetter',
            filePathUrl,
            singlejobapplicationid
        )
        console.log(
            '🚀 ~ file: jobsController.js ~ line 825 ~ generateLetter ~ record',
            record
        )

        return res.status(200).json({
            data: letter,
            message: 'Joining Letter Send !',
        })
    } catch (err) {
        console.log('Error processing request: ' + err)
        return res.status(500).json({
            message: err,
        })
    }
}

const changeStatus = async (req, res) => {
    try {
        const id = req.body.id
        if (!id) {
            return res
                .status(500)
                .json({ message: 'to access this route need Id' })
        }
        const job = await Jobs.findById(id)
        job.jobstatus = !job.jobstatus
        job.save()

        return res.status(200).json({
            job: job,
            message: `Job Status Changed.Job - ${job.jobstatus} `,
        })
    } catch (e) {}
}

const getAllJobPost = async (req, res, next) => {
    try {
        const jobPosts = await Jobs.find()
            .select('jobtitle')
            .distinct('jobtitle')

        return res.status(200).json({
            jobPosts,
            message: 'All Jobs Post',
        })
    } catch (err) {
        return res.status(500).json({
            message: err,
        })
    }
}

module.exports = {
    countTotalDocumentForDashboard,
    createJobs,
    getAdminjobsById,
    getJobs,
    getRecntsJobs,
    deleteAdminSingleJobByJobId,
    getJobDetailsById,
    getAdminSingleJobByJobId,
    updateAdminSingleJobByJobId,
    updateAdminSingleJobStatusByJobId,
    applyjobController,
    getAllUserAppliedOnJobApplication,
    getJobApplicationOfSingleUser,
    updateJobApplicationOfSingleUser,
    sendJoiningDocumantationMail,
    jobApplicationPostComments,
    jobApplicationGetComments,
    generateOfferLetter,
    generateLetter,
    changeStatus,
    getAllJobPost,
    aliasTopJobs,
}
