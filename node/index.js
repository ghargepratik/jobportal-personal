require('dotenv').config()
require('./config/connection.js')()
const express = require('express')
const app = express()
const cors = require('cors')
const api = require('./routes/api.js')
const parser=require("body-parser")
global.__basedir = __dirname

app.use('/public', express.static('./public'))

/**
 *
 * middleware
 *
 */
app.use(cors())
app.use(parser.urlencoded({extended:false}));                                   //needed specially for ejs file
app.use(parser.json())                                                  //needed specially for ejs file
app.use(express.json())

/**
 *
 *
 * client setup
 *
 */
const path = __dirname + '/client/'
app.use(express.static(path))

/**
 *
 * node API to call react app
 *
 */
app.get('/', function (req, res) {
    console.log('client')
    res.sendFile(path + 'index.html')
})

/**
 *
 *
 * API Routes
 *
 */
app.use('/api', api)

/**
 *
 *
 * Server
 */
app.listen(process.env.PORT, () => {
    console.log(`server running ${process.env.PORT}`)
})
