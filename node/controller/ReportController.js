const jobApplication = require('../models/applyjobSchema.js')

const reportList = async (req, res) => {
    try {
        let typeList = []
        let list = []
        let type = req.query.type
        if (type === 'i') {
            typeList = ['First_Interview_Scheduled', 'Second_Interview_Scheduled', 'HR_Interview_Scheduled']
        } else if (type === 'h') {
            typeList = ['Hired']
        } else if ('j') {
            typeList = ['Joined']
        }

        if (req.query.start && req.query.end) {
            list = await jobApplication
                .find({
                    createdAt: {
                        $gte: new Date(req.query.start),
                        $lt: new Date(req.query.start),
                    },
                    status: typeList,
                })
                .populate('jobid')
                .populate('scheduled_interview_id')
        } else {
            list = await jobApplication
                .find({
                    status: typeList,
                })
                .populate('jobid')
                .populate('scheduled_interview_id')
        }

        return res.status(200).json({ message: 'Report list', lists: list })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Something went wrong', err: e })
    }
}

const interviewScheduledReport = async (req, res) => {
    try {
        let list = []
        let typeList = ['First_Interview_Scheduled', 'Second_Interview_Scheduled', 'HR_Interview_Scheduled']

        if (req.query.start && req.query.end) {
            // console.log(new Date(req.query.start), req.query.end);
            // console.log("in schedule interviw");
            list = await jobApplication
                .find({
                    status: typeList,
                })
                .populate('jobid')
                .populate({
                    path: 'scheduled_interview_id',
                    match: {
                        date: {
                            $gte: new Date(req.query.start),
                            $lt: new Date(req.query.end),
                        },
                    },
                })

            list = list.filter((val) => {
                if (val.scheduled_interview_id) {
                    return val
                }
            })
        } else {
            list = await jobApplication
                .find({
                    status: typeList,
                })
                .populate('jobid')
                .populate('scheduled_interview_id')
        }

        return res.status(200).json({ message: 'Report list', lists: list })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Something went wrong', err: e })
    }
}

const hiredScheduledReport = async (req, res) => {
    try {
        let list = []
        let typeList = ['Hired']

        if (req.query.start && req.query.end) {

           list=await jobApplication.aggregate([{$match:{status:typeList[0]}},{$match:{updatedAt:{$gte:new Date(req.query.start),$lt:new Date(req.query.end)}}}])
                console.log("list",list)
         
        } else {
            list = await jobApplication
                .find({
                    status: typeList,
                })
                .populate('jobid')
                .populate('offer_latter_id')
        }

        return res.status(200).json({ message: 'Report list', lists: list })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Something went wrong', err: e })
    }
}

const joinedScheduledReport = async (req, res) => {
    try {
        let list = []
        let typeList = ['Joined']

        if (req.query.start && req.query.end) {
            // console.log("fil date",req.query.start , req.query.end)
            list = await jobApplication
                .find({
                    status: typeList,
                })
                .populate('jobid')
                .populate({
                    path: 'offer_latter_id',
                    match: {
                        joining_date: {
                            $gte: new Date(req.query.start),
                            $lt: new Date(req.query.end),
                        },
                    },
                })
            console.log('list', list)
            list = list.filter((val) => {
                if (val.offer_latter_id) {
                    return val
                }
            })
        } else {
            list = await jobApplication
                .find({
                    status: typeList,
                })
                .populate(['jobid', 'offer_latter_id'])
        }

        return res.status(200).json({ message: 'Report list', lists: list })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Something went wrong', err: e })
    }
}

module.exports = {
    reportList,
    interviewScheduledReport,
    hiredScheduledReport,
    joinedScheduledReport,
}
