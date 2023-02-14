const Admin = require('../models/adminSchema.js') //admin Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { insertActivity } = require('./ActivityController')
const { mailEmitter } = require('../email/MailSender.js')


//REGISTER USER OR ADMIN
const adminRegister = async (req, res, next) => {
    try {
        const {
            username = req.body.name,
            status = 'user',
            email,
            phonenumber,
            password = 'jobportal@user1234',
            cpassword = 'jobportal@user1234',
        } = req.body

        if (
            !(
                username &&
                email &&
                password &&
                status &&
                phonenumber &&
                cpassword
            )
        ) {
            return res.status(400).send('All input is required')
        }

        const oldAdmin = await Admin.findOne({ email })
        if (oldAdmin) {
            return res.status(409).json({
                error: 'this email is  Already used. Please Login',
            })
        }

        if (password !== cpassword) {
            return res.status(409).json({
                error: 'Password not match',
            })
        }
        encryptedUserPassword = await bcrypt.hash(password, 10)

        const admin = await Admin.create({
            username,
            status,
            email: email.toLowerCase(),
            phonenumber,
            password: encryptedUserPassword,
        })

        console.log('admin', admin)

        if (req.apply_job) {
            return admin
        }

        const token = await jwt.sign(
            { id: admin._id, email },
            process.env.SECREATE_KEY,
            { expiresIn: '3d' }
        )
        admin.token = token
        const activity = insertActivity(admin._id, 1) //1=>registation action
        return res.status(201).json({
            user: admin,
            token,
            message: 'User registered',
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}



//LOGIN USER OR REGISTER
const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!(email && password)) {
            return res.status(409).json('FIll ALL INPUTS')
        }
        const existsAdmin = await Admin.findOne({ email })
        if (!existsAdmin) {
            return res.status(409).send('You are not Exist. Please Register')
        }
        console.log(password, existsAdmin.password)
        const cmpPassword = await bcrypt.compare(password, existsAdmin.password)
        if (!cmpPassword) {
            return res.status(403).json('email and Password not match')
        }
        const token = jwt.sign(
            { id: existsAdmin._id, email },
            process.env.SECREATE_KEY,
            {
                expiresIn: '3d',
            }
        )
        existsAdmin.token = token
        insertActivity(existsAdmin._id, 2)
        return res.status(200).json({
            existsAdmin,
            token,
            message: 'login success',
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}



//FORGET OR RESET-PASSWORD
const forgetPassword = async (req, res, next) => {
    console.log("i am in forget-Password",req.body);
    try {
        const { email} = req.body
       
        if (!email ) {
            return res.status(409).json('Email Not Found')
        }
        const emailExixts = await Admin.findOne({ email })
        // console.log("🚀 ~ file: adminController.js ~ line 118 ~ forgetPassword ~ emailExixts", emailExixts)
        if (!emailExixts) {
            return res.status(409).send({message:'You are not Exist. Please Register'})
        }

        const generateToken=jwt.sign(
            {id:emailExixts._id,email},
            process.env.SECREATE_KEY,
            {expiresIn: '10m'}
        )
       

        if(!generateToken){
            return res.status(500).json({
                message:"Error accoured while creating Token",
                status:"error"
            })
        }

        emailExixts.resetToken=generateToken;
        emailExixts.expireToken=Date.now() + 10 * 60 * 1000;            //10 -represent { 10 Minutes}

        const saveToken=await emailExixts.save();
        
    //FrontEndUrl To render ResetPassword Page
        const resetUrl = `${process.env.DOMAIN_URL}/#/resetpassword/${saveToken.resetToken}`            
        // const resetUrl = `${req.protocol}://${req.hostname}/api/admin/passwordResetToken/${saveToken.resetToken}`
        

        //SENDING EMAIl
        mailEmitter.emit('sendForgetPasswordMail', emailExixts.username, emailExixts.email,resetUrl) ;


        return res.status(200).json({
            message:"add your client url that handle reset password",
            data:{
                resetToken:saveToken.resetToken,
                expireToken:saveToken.expireToken
            },
            status:"success"
        })
        
    } catch (err) {
        console.log("🚀 ~ file: adminController.js ~ line 172 ~ forgetPassword ~ err", err)
        return res.status(500).json({
            message:`Error accoured while saving Token ${err}`,
            status:false
        })
    }
}


//CHECK RESET TOKEN {Campare token and exipired time}
const checkPasswordResetToken=async(req,res,next)=>{
    const recievedToken=req.params.token;
    // console.log("🚀 ~ file: adminController.js ~ line 183 ~ resetPassword ~ recievedToken", recievedToken)

    try{

        if(!recievedToken){
            return res.status(403).json("Token is not found");
        }
    
        await jwt.verify(recievedToken, process.env.SECREATE_KEY, (err, admin) => {
                if (err) {
                return res.status(403).json("Token is not Valid or Expired");
                } else {
                    // console.log("admin>>>>>>>>>>>>>",admin)
        
                    return res.status(200).json({
                        message:"Token is not Valid or Expired",
                        data:{
                            user:admin,
                            resettoken:req.params.token
                        },
                        status:"success"
                    })
                    // res.sendFile( __basedir + '/index.html');               //(__basedie ->root directory)
                //FOR EJS
                    // res.render("resetpassword/resetpassword.ejs",{
                    //     resetToken:req.params.token,
                    //     userId:admin.id,
                    //     userEmail:admin.email
                    // })
                }
          });

    }catch(err){
        return res.status(500).json({
            message:`Error accoured while Checking Token ${err}`,
            status:false
        })
    }
    
}

//CHANGE PASSWORD 
const resetPassword=async(req,res,next)=>{
    console.log("I am in resetPassword",req.body);      //I am in resetPassword [Object: null prototype] {
                                                            //     password: 'ghfghfh',
                                                            //     cpassword: 'hgjghj',
                                                            //     resetToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmI1ZGVhNzA1ZTQzYWM1ZjVkNDEyYyIsImVtYWlsIjoicHJhdGlrLmdoYXJnZTMxQGdtYWlsLmNvbSIsImlhdCI6MTY2OTAzODE4MywiZXhwIjoxNjY5MDM4NzgzfQ.YEat41kOduTMrccrFx3F5ehgnqqumvxYsKIqTwnSYD0',
                                                            //     userId: '636b5dea705e43ac5f5d412c',
                                                            //     userEmail: 'pratik.gharge31@gmail.com'
                                                            // }

    try{
        if(!req.body){
            return res.status(409).send({message:'Body Not Found, While resetPassword'})
        }
        if(!req.body.email){
            return res.status(409).send({message:'try again,Email not Found'})
        }else{

        encryptedUserPassword = await bcrypt.hash(req.body.password, 10)
        const existsAdmin = await Admin.findOne({email:req.body.email })
        // console.log("🚀 ~ file: adminController.js ~ line 233 ~ resetPassword ~ existsAdmin", existsAdmin)
        
        existsAdmin.password=encryptedUserPassword;

        await existsAdmin.save();

        return res.status(200).json({
            existsAdmin,
            message: 'Password Change',
        })

    }
    }catch(err){
        return res.status(500).json({
            message:`Error accoured while reset Password ${err}`,
            status:false
        })
    }
    
   
}
module.exports = { adminRegister, adminLogin,forgetPassword,checkPasswordResetToken,resetPassword }
