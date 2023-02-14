const mongoose = require('mongoose')
const logger = require('./logger')

//mongoURLGuide=mongodb://username:password@host/dbname?retryWrites=true&w=majority
// or
//mongoURLGuide=mongodb://username:password@host/dbname:port?retryWrites=true&w=majority
const connection = () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then((res) => {
            console.log('DB_Connected')
            logger.log('debug', 'DB_Connected')
        })
        .catch((err) => {
            console.log('DB connection error', err)
            logger.log('error', `DB connection error - ${err.message}`)
        })
}

module.exports = connection
