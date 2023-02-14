const mongoose = require('mongoose')
const slugify = require('slugify')
const applyjobSchema = new mongoose.Schema(
    {
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'admin',
            required: true,
        },
        jobid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'jobs',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phonenumber: {
            type: Number,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        position: {
            type: String,
        },
        currentctc: {
            type: String,
            required: true,
        },
        expectedctc: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        jobposttitle: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: [
                'Open',
                'First_Interview_Scheduled',
                'Second_Interview_Scheduled',
                'HR_Interview_Scheduled',
                'Hired',
                'Offered',
                'Joining_Offered',
                'Joined',
                'Rejected',
            ],
            default: 'Open',
        },
        scheduled_interview_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sheduleinterview',
            default: null,
        },
        offer_latter_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'letter',
            default: null,
        },
        applicationNumber: {
            type: String,
            required: true,
        },
        pmpCardId: {
            //This is the Id of PMP CARD(This is for PMP project)
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
)

applyjobSchema.pre('save', function (next) {
    let url = slugify(this.url, {
        replacement: '-',
        lower: true,
    })
    this.url = `/public/resumes/${url}`
    next()
})

//Query Middleware
applyjobSchema.pre('find', function (next) {
    this.find({ url: { $ne: null } })
    next()
})

module.exports = mongoose.model('appliedJob', applyjobSchema)
