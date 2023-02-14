const jwt = require('jsonwebtoken')
const Admin = require('../models/adminSchema.js')
const Jobs = require('../models/jobsSchema.js')

const verifyToken = async (req, res, next) => {
    console.log('verify in')

    const authHeader = req.body.token || req.query.token || req.headers.token

    if (authHeader) {
        const token = authHeader.split(' ')[1]
        // console.log("token", token);
        await jwt.verify(token, process.env.SECREATE_KEY, (err, admin) => {
            if (err) {
                return res.status(403).json('Token is not valid')
            } else {
                req.user = admin //now we assign our user to request

                // console.log("token verified",req.user)
                // console.log("req.user.id",req.user.id)

                req.userid = req.user.id //I want to passthis Id to {applyjobController} and store this Id in Admin Schema

                next()
            }
        })
    } else {
        return res.status(401).json('you are not Authenticate')
    }
}

const verifyTokenAndAdmin = (req, res, next) => {
    // console.log("admin token verify in");

    verifyToken(req, res, async () => {
        const admin = await Admin.findOne({ email: req.user.email })
        // console.log(admin, "admin");

        if (admin.status === 'admin') {
            req.adminid = admin._id // I want To store this Id in JObs Schema(to filter admin JOBs List) so i pass this Id to next function

            console.log('admin token verified')
            next()
        } else {
            return res.status(403).json({
                error: 'not Admin! ,you are not allow to do that',
            })
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAdmin }
