import React from 'react'
import { Modal } from 'react-bootstrap'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { CgCloseR } from 'react-icons/cg'

const ForgotPassword = (props) => {
    console.log("🚀 ~ file: ForgotPassword.js ~ line 10 ~ ForgotPassword ~ props", props)
    const [showModal, setShowModel] = useState(true)
    const [showError, setShowError] = useState(false)

    const [email, setEmail] = useState('')


    const validationHandler = (e) => {
        e.preventDefault()
        
        const EmailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      
        if(EmailRegex.test(email.trim()) === false){
          setShowError(true)
        toast.error('Email is not valid')
        }else {
          setShowError(false)
          submitHandler(e)
        }
    }

    const submitHandler = (e) => {
     
      try {
        axios
          .post(`${process.env.REACT_APP_DOMAIN_URL}/api/admin/forget-password`, {email:email})
          .then((response) => {
            console.log('res data forgot password',response.data)
            if(response.data){
              setShowModel(false)
            }
          })
          .catch((err) => {
            console.log("🚀 ~ file: ForgotPassword.js ~ line 43 ~ submitHandler ~ err", err)
            toast.error(err.response.data.message || 'Something Went Wrong')
          })
      } catch (err) {
        console.log('axios err', err)
      }
    }

    // we have sent an email for varification on your email. By clicking on it, you can change your password
    const ThankYouMessage = `we have sent an email for varification on your email <strong> ${email}</strong>. By clicking on it, you can change your password. <br /><br /> Thank You`
  return (
    <div style={{"pointer-events":"none","position":"fixed"}}>
    <Modal show={props.show} onHide={props.closeForm} backdrop="static">

    {showModal ? (
        <div>
          <Modal.Header >
            <Modal.Title>Forgot Password</Modal.Title>
            <CgCloseR className="btn-close" aria-label="Close" onClick={props.closeForm}/>
          </Modal.Header>
          <Modal.Body>
                  <div className="form-group">
                      <label for="exampleInputPassword1">Your Email</label>
                      <input
                      type="email"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Email"
                      name="email"
                      onChange={(e)=>setEmail(e.target.value)}
                      value={email}
                      />
                  </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-primary" onClick={validationHandler}>
              submit
            </button>
          </Modal.Footer>
        </div>
    ) : (

          <div>
              <Modal.Header >
                <Modal.Title>Mail Send</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p dangerouslySetInnerHTML={{ __html: ThankYouMessage }}></p>{' '}
              </Modal.Body>
              <Modal.Footer>
                <button type="submit" className="btn btn-primary" onClick={props.closeForm}>
                  Close
                </button>
              </Modal.Footer>
            </div>
    )}
    </Modal>
  </div>
  )
}

export default ForgotPassword







/*
const ApplyNowJob = (props) => {
  const [showModal, setShowModel] = useState(true)
  const [input, setInput] = useState({email: ''})
  
  const [showError, setShowError] = useState(false)
  
  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const fileHandler = (e) => {
    setInput({ ...input, user_file: e.target.files[0] })
  }

  const validationHandler = (e) => {
    e.preventDefault()
    setShowError(false)
    const EmailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
   
    if (input.email.trim() === '' ) {
      setShowError(true)
      toast.error('Please Fill All Fields')
    }  else {
      setShowError(false)
      submitHandler(e)
    }

    if (showError) {
      setShowError(false)
    }
  }

  const submitHandler = (e) => {
    const token = localStorage.getItem('token')
    let config = {
      headers: {
        headers: { 'Content-Type': 'multipart/form-data' },
        token: `Bearer${token}`,
      },
    }

    
    try {
      axios
        .post(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/apply-job`, formData, config)
        .then((response) => {
          console.log(response.data.data.applicationNumber, 'res data applied job')
          setShowModel(false)
        })
        .catch((err) => {
          console.log('catch err', err)
        })
    } catch (err) {
      console.log('axios err', err)
    }
  }

  
  

  
  const ThankYouMessage = `You Have Sucessfully appied for the the post of <strong> ${
    props.jobposttitle || selectedJob
  }</strong> and Your application Number is <strong> ${getAppplicationNo}</strong>`

  return (
    <div style={{"pointer-events":"none","position":"fixed"}}>
      <Modal show={props.show} onHide={props.closeForm} backdrop="static"  >
        {showModal ? (
          <div>
            <Modal.Header >
              <Modal.Title>Apply For {props.jobposttitle}</Modal.Title>
              <CgCloseR className="btn-close" aria-label="Close" onClick={props.closeForm}/>
            </Modal.Header>
            <Modal.Body>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Your Email</label>
                        <input
                        type="email"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Email"
                        name="email"
                        onChange={inputHandler}
                        value={input.email}
                        />
                    </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="submit" className="btn btn-primary" onClick={validationHandler}>
                Apply Now
              </button>
            </Modal.Footer>
          </div>
        ) : (
          <div>
            <Modal.Header >
              <Modal.Title>Thank You</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p dangerouslySetInnerHTML={{ __html: ThankYouMessage }}></p>{' '}
            </Modal.Body>
            <Modal.Footer>
              <button type="submit" className="btn btn-primary" onClick={props.closeForm}>
                Close
              </button>
            </Modal.Footer>
          </div>
        )}
      </Modal>

      <div>{showModal && <ThankYou setShowModel={setShowModel} showModel={showModal} />}</div>
    </div>
  )
}

export default ApplyNowJob
*/