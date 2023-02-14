const express = require('express')
const route = express.Router()
const { upload, resume } = require('../utility/fileUploads')
const Validation = require('../middleware/Validations')
const reportController = require('../controller/ReportController')
const templateController = require('../controller/emailTemplateController.js')
const { interviewSchedule } = require('../controller/scheduleController.js')
const jobController = require('../controller/jobsController.js')
const { getLogs } = require('../controller/ActivityController.js')
const { verifyTokenAndAdmin } = require('../middleware/auth.js')
const commentfiles = require('../multerfile/commentFiles.js')
const {
    addAddress,
    getAllAddresses,
    getSingleAddress,
    editAddress,
    deleteAddress,
} = require('../controller/addressController.js')
const {
    adminRegister,
    adminLogin,
    forgetPassword,
    checkPasswordResetToken,
    resetPassword,
} = require('../controller/adminController.js')
const {
    getAllGeneratedDocRecords,
} = require('../controller/GeneretedDocRecorsController.js')
const {
    getAllSendEmailRecords,
} = require('../controller/emailsRecordsController.js')
const { saveCardIdInAppliedJob } = require('../controller/pmpController.js')
const {
    techinfiniContactUs,
} = require('../controller/techinfiniContactUsController.js')
const {
    validateReCaptcha,
} = require('../controller/validateReCaptchaController.js')

//TEST ROUT
route.get('/test', (req, res) => {
    res.send('Code updated2')
})

/*
|
| Admin API
|
*/
route.route('/admin/register').post(adminRegister)
route.route('/admin/login').post(adminLogin)
route.route('/admin/forget-password').post(forgetPassword)
route.route('/admin/passwordResetToken/:token').get(checkPasswordResetToken)
route.route('/admin/resetPassword').post(resetPassword)

/*
|
| Email Templates API
|
*/
route
    .route('/email-template/create')
    .post(verifyTokenAndAdmin, templateController.setEmailTemplateDefaultData)
route
    .route('/email-template/get')
    .get(verifyTokenAndAdmin, templateController.getEmailTemplateDefaultData)
route
    .route('/email-template/update/:templateid')
    .put(verifyTokenAndAdmin, templateController.updateEmailTemplateDefaultData)

/**
 *
 * Intervie API
 *
 */
route.route('/interview/schedule').post(verifyTokenAndAdmin, interviewSchedule)

/**
 *
 * Jobs API
 *
 */
route
    .route('/jobs/total-document')
    .get(verifyTokenAndAdmin, jobController.countTotalDocumentForDashboard)
route
    .route('/jobs/create')
    .post(
        verifyTokenAndAdmin,
        upload,
        Validation.JobPost,
        jobController.createJobs
    )
route
    .route('/jobs/admin-jobs')
    .get(verifyTokenAndAdmin, jobController.getAdminjobsById)
route
    .route('/jobs/admin-single-jobs/:jobid')
    .get(verifyTokenAndAdmin, jobController.getAdminSingleJobByJobId)
route
    .route('/jobs/admin-job-update/:jobid')
    .put(verifyTokenAndAdmin, upload, jobController.updateAdminSingleJobByJobId)
route
    .route('/jobs/admin-job-status-update/:jobid')
    .put(
        verifyTokenAndAdmin,
        upload,
        jobController.updateAdminSingleJobStatusByJobId
    )
route
    .route('/jobs/delete/:jobid')
    .delete(verifyTokenAndAdmin, jobController.deleteAdminSingleJobByJobId)
route
    .route('/jobs/applied-user')
    .get(verifyTokenAndAdmin, jobController.getAllUserAppliedOnJobApplication)
    .patch(verifyTokenAndAdmin, jobController.updateJobApplicationOfSingleUser)
route
    .route('/jobs/applied-user-info/:_id')
    .get(verifyTokenAndAdmin, jobController.getJobApplicationOfSingleUser)
    .patch(verifyTokenAndAdmin, jobController.updateJobApplicationOfSingleUser)
route
    .route('/jobs/applied-user-info/joining-doc-mail/:_id')
    .get(verifyTokenAndAdmin, jobController.sendJoiningDocumantationMail)
route
    .route('/jobs/applied-user-info/offer-letter')
    .post(verifyTokenAndAdmin, jobController.generateOfferLetter)
route
    .route('/jobs/applied-user-info/joining-letter')
    .post(verifyTokenAndAdmin, jobController.generateLetter)
route
    .route('/jobs/applied-user-info/comment')
    .post(
        verifyTokenAndAdmin,
        commentfiles,
        jobController.jobApplicationPostComments
    )
route
    .route('/jobs/applied-user-info/comment/:singlejobapplicationid')
    .get(
        verifyTokenAndAdmin,
        commentfiles,
        jobController.jobApplicationGetComments
    )
route.route('/jobs/get').get(jobController.aliasTopJobs, jobController.getJobs)
route
    .route('/jobs/get-recents-job/:currentJobId')
    .get(jobController.aliasTopJobs, jobController.getRecntsJobs)
route.route('/jobs/get/:id').get(jobController.getJobDetailsById)
route.route('/jobs/apply-job').post(resume, jobController.applyjobController)
route.route('/jobs/change-status').post(jobController.changeStatus)
route.route('/jobs/all-posts').get(jobController.getAllJobPost)

/*
|
| Report Api
|
*/
route.route('/reports/report-list').get(reportController.reportList)
route
    .route('/reports/scheduled-interview-list')
    .get(reportController.interviewScheduledReport)
route.route('/reports/hired-list').get(reportController.hiredScheduledReport)
route.route('/reports/joined-list').get(reportController.joinedScheduledReport)

/*
|
| All ACTIVITIES (AuditLog) Api
|
*/
route.route('/activity/list').get(getLogs)

/*
|
| Addresses API
|
*/
route.route('/address/create').post(verifyTokenAndAdmin, addAddress)
route.route('/address/get-all').get(verifyTokenAndAdmin, getAllAddresses)
route
    .route('/address/get/:addressid')
    .get(verifyTokenAndAdmin, getSingleAddress)
route.route('/address/edit/:addressid').put(verifyTokenAndAdmin, editAddress)
route
    .route('/address/delete/:addressid')
    .delete(verifyTokenAndAdmin, deleteAddress)

/*
|
| GENERATED DOCUMENT RECORDS API
|
*/
route
    .route('/documents/get-all')
    .get(verifyTokenAndAdmin, getAllGeneratedDocRecords)

/*
|
| SEND EMAILS RECORDS API
|
*/
route
    .route('/send-email-record/get-all')
    .get(verifyTokenAndAdmin, getAllSendEmailRecords)

/*
|
| PMP Releated API's
|
*/
route
    .route('/save-pmp-cardId/:singlejobapplicationid')
    .patch(verifyTokenAndAdmin, saveCardIdInAppliedJob)

/*
|
| TECHINFINI SITE Releated API's ContactUs
|
*/
route
    .route('/techinfini/contact-us')
    .post(Validation.ContactUs, techinfiniContactUs)
/*
|
| TECHINFINI SITE Releated API's ContactUs {Validate RecaptCha}
|
*/
route.route('/techinfini/contact-us/validate-recaptcha').post(validateReCaptcha)

module.exports = route
