const Applyjob = require('../models/applyjobSchema.js')

//Save cardId in aplliedJob (this will hit after Interview Shedule)
exports.saveCardIdInAppliedJob = async (req, res, next) => {
    console.log('saveCardIdInAppliedJob req.body', req.body)
    try {
        const id = req.params.singlejobapplicationid
        console.log('🚀 ~ file: pmpController.js:7 ~ id', id)

        if (!id) {
            return res.status(409).send('JobApplicationId not found')
        }

        const userInfo = await Applyjob.findByIdAndUpdate(
            id,
            {
                $set: { pmpCardId: req.body.pmpCardId },
            },
            { new: true }
        )
        console.log(
            '🚀 ~ file: pmpController.js:16 ~ exports.saveCardIdInAppliedJob= ~ userInfo',
            userInfo
        )

        return res.status(200).json({
            userInfo,
            message: 'cardId saved Successfully in AppliedJob',
        })
    } catch (error) {
        console.log(err)
        return res.status(500).send('server err', err)
    }
}
