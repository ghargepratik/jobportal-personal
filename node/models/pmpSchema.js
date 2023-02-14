const mongoose = require('mongoose')

const PMPDetails = new mongoose.model(
    {
        pmpListId: { type: String, require: true },
        cardId: { type: String, require: true },
        application_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'appliedJob',
            default: null,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.Schema('pmpDetails', PMPDetails)
