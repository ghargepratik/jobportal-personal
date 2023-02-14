const { check, body } = require('express-validator')

exports.AddCourseCategoryValidation = [
    check('title', 'Title is requied').not().isEmpty(),
]

exports.JobPost = [
    body('companyname', 'company-name is requied').not().isEmpty(),
    body('email', 'Email is requied').not().isEmpty(),
    body('jobtitle', 'job-title is requied').not().isEmpty(),
    body('experience_from', 'Year Of experience_from is requied')
        .not()
        .isEmpty(),
    body('joblocation', 'joblocation is requied').not().isEmpty(),
    body('experience_to', 'Year of experience_to is requied').not().isEmpty(),
    body('eduction', 'eduction is requied').not().isEmpty(),
    body('experiencedetail', 'experience-detail is requied').not().isEmpty(),
    body('knowledgeof', 'knowledge-of is requied').not().isEmpty(),
    body('skillsrequired', 'skills-required is requied').not().isEmpty(),
    body('jobtype', 'jobt-ype is requied').not().isEmpty(),
]

exports.registration = [
    body('username', 'username is requied').isEmpty(),
    body('email', 'Email is requied').isEmpty(),
    body('password', 'password is requied').isEmpty(),
]

exports.ContactUs = [
    body('username', 'username is requires').not().isEmpty(),
    body('email', 'email is requires').not().isEmpty(),
    body('email', 'email is Not valid').isEmail(),
    body('phonenumber', 'phonenumber is required').not().isEmpty(),
    body('message', 'message is requires').not().isEmpty(),
]
