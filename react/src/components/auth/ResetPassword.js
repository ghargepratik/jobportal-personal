import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import Loader from '../utility/Loader'

const ResetPassword = () => {
    const [password,setPassword]=useState("");
    const [cpassword,setCPassword]=useState("");
    const [userToUpdate,setUserToUpdate]=useState("");
    const [showResetPassForm,setShowResetPassForm]=useState(false);
    const {resettoken}=useParams()
   

//CHECK TOKEN ISVALID OR EXPIRED
    const checkResetTokenIsValid = (e) => {
        console.log("checkResetTokenIsValid Is Call");
        if(resettoken){
            try {
                axios
                    .get(`${process.env.REACT_APP_DOMAIN_URL}/api/admin/passwordResetToken/${resettoken}`)
                    .then((response) => {
                        //  console.log("🚀 ~ file: ResetPassword.js ~ line 23 ~ .then ~ response", response.data.data)
                         
                         if(response.data.data){
                            setUserToUpdate(response.data.data.user)
                            setShowResetPassForm(true)
                         }
                    })
                    .catch((err) => {
                        console.log("🚀 ~ file: ResetPassword.js ~ line 30 ~ checkResetTokenIsValid ~ err", err)
                        toast.error(err.response.data || 'Something Went Wrong')
                        
                    })
            } catch (err) {
                console.log('axios err', err)
            }
        }else{
            toast.error( 'Try again, Something Went Wrong')
        }
      }

    useEffect(()=>{
        checkResetTokenIsValid()
    },[resettoken])

    const validationHandler = (e) => {
        e.preventDefault()
        if (password.trim() === '' || cpassword.trim() === '' ) {
          toast.error('Please Fill All Fields')
        } else if (!(password===cpassword)) {
          toast.error('Password and Confirm Password Not Same')
        }else {
          submitHandler(e)
        }
    }


    const submitHandler = (e) => {
        e.preventDefault()
        let body={
          password :password,
          cpassword :cpassword,
          email:userToUpdate.email,
          id:userToUpdate.id
        }
    
        try {
          axios
            .post(`${process.env.REACT_APP_DOMAIN_URL}/api/admin/resetPassword`, body)
            .then((response) => {
              console.log("🚀 ~ file: ChangePassword.js ~ line 42 ~ .then ~ response", response.data)
              if(response.data){
                toast.success(response.data.message || "Password Change Successfully")
              }

            })
            .catch((err) => {
              console.log("🚀 ~ file: ResetPassword.js ~ line 82 ~ submitHandler ~ err", err)
              toast.error(err.response.data || 'Something Went Wrong')
              
            })
        } catch (err) {
          console.log('axios err', err)
        }
      }

  return (
      <div className="hold-transition login-page">
          <div className="login-box">
              <div className="login-logo">
                <img src="https://techinfini.in//wp-content/uploads/2017/09/logo-2-5.png" style={{ width: '170px', heigth: '60px' }} alt="Logo" />
              </div>

              {
                !showResetPassForm
                          ?
                          <div>
                            <Loader />
                            <p>Loading...</p>
                          
                          </div>
                          :
                          <div className="card">
                              <div className="card-body login-card-body">
                                    <p className="login-box-msg">Reset Your password</p>

                                    <form action="../../index3.html" method="post">
                                      <div className="input-group mb-3">
                                        <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        required="true"
                                        />
                                        <div className="input-group-append">
                                          <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="input-group mb-3">
                                        <input
                                          type="password"
                                          className="form-control"
                                          placeholder="Password"
                                          name="password"
                                          value={cpassword}
                                          onChange={(e)=>setCPassword(e.target.value)}
                                          required="true"
                                        />
                                        <div className="input-group-append">
                                          <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row text-center">
                                        <div className="col-6 offset-2">
                                          <button type="submit" className="btn btn-primary btn-block" onClick={validationHandler}>
                                            Submit
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                              </div>
                          </div>
              }
   
          </div>
      </div>
  )
}

export default ResetPassword