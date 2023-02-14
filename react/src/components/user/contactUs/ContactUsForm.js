import React, { useState, useRef } from 'react'
import ContactUsMap from './ContactUsMap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import { TiSocialFacebook, TiSocialGooglePlus, TiSocialTwitter, TiSocialYoutube, TiSocialLinkedin } from 'react-icons/ti'
import ReCaptchaComponent from '../../common/ReCaptchaComponent'
// import { TfiYoutube } from 'react-icons/all'
import Loader from '../../utility/Loader'

const ContactUsForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [message, setMessage] = useState('')
  const [isVerify, setIsVerify] = useState(false)
  const [showLoader, setsetShowLoader] = useState(false)
  const btnElement = useRef()

  const validationHandler = (e) => {
    e.preventDefault()
    const EmailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const MobileRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/

    if (username.trim() === '' || email.trim() === '' || phonenumber.trim() === '' || message.trim() === '') {
      toast.error('Please Fill All Fields')
    } else if (EmailRegex.test(email) === false) {
      toast.error('Email is not valid')
    } else if (MobileRegex.test(phonenumber) === false) {
      toast.error('Phone Number is not valid')
    } else if (!isVerify) {
      toast.error('ReCAPTCHA is Not Verify')
    } else {
      submitHandler(e)
    }
  }

  let getOnChangeReCaptchaTokenandVerify = (token) => {
    console.log('Captcha tokrn:', token)
    if (token) {
      const body = {
        token: token,
      }
      console.log('🚀 ~ file: ContactUsForm.js:40 ~ getOnChangeReCaptchaTokenandVerify ~ body', body)

      try {
        axios
          .post(`${process.env.REACT_APP_DOMAIN_URL}/api/techinfini/contact-us/validate-recaptcha`, body)
          .then((response) => {
            console.log('register res', response.data)
            if (response.data.data.success) {
              setIsVerify(true)
              btnElement.current.disabled = false
              toast.success('ReCAPTCHA Validatation Successfully')
            } else {
              toast.error('ReCAPTCHA Validatation Faild,Please Try Again')
            }
          })
          .catch((err) => {
            console.log('err>>>>>>.', err)
            toast.error('Something went wrong,Try again Later')
          })
      } catch (err) {
        console.log('🚀 ~ file: ContactUsForm.js:53 ~ getOnChangeReCaptchaTokenandVerify ~ err', err)
        toast.error('Something went wrong,Try again Later')
      }
    }
  }

  const submitHandler = (e) => {
    setsetShowLoader(true)
    const body = {
      username,
      email,
      phonenumber,
      message,
    }
    console.log('🚀 ~ file: ContactUsForm.js:26 ~ submitHandler ~ body', body)
    try {
      axios
        .post(`${process.env.REACT_APP_DOMAIN_URL}/api/techinfini/contact-us`, body)
        .then((response) => {
          console.log('ContactUsForm res', response.data)
          toast.success(response.data.message || 'Send Successfully')
          setsetShowLoader(false)
        })
        .catch((err) => {
          console.log('err>>>>>>.', err)
          toast.error('Something went wrong,Try again Later')
        })
    } catch (err) {
      setsetShowLoader(false)
      console.log('🚀 ~ file: ContactUsForm.js:53 ~ submitHandler ~ err', err)
      toast.error('Failed to send your message. Please try later or contact the administrator by another method.')
    }
  }

  return (
    <section id="contact-us">
      <div className="opening-template">
        <h2 className="text-center mt-5 fw-normal">Contact Us</h2>
        <div className="container">
          <div className="contact-inner row mt-5">
            <div className=" col-md-5 message text-right ">
              <h2 className="sub-heading">Write a message</h2>
              <p className="message-text">If you got any questions, please do not hesitate to send us a message. We reply within 24 hours !</p>
              <p className="message-sub-text">Our profiles in social media:</p>
              <div>
                <a href="https://www.facebook.com/TechInfini" className="icon_bar  icon_bar_facebook icon_bar_small" target="_blank">
                  <span className="t">
                    <TiSocialFacebook className="icon-facebook" />
                  </span>
                  {/*
                  <span className="b">
                    <TiSocialFacebook className="icon-facebook" />
                  </span>
  */}
                </a>
                <a
                  href="https://plus.google.com/+TechInfiniSolutionsPvtLtdIndore"
                  className="icon_bar  icon_bar_google icon_bar_small"
                  target="_blank"
                >
                  <span className="t">
                    <TiSocialGooglePlus className="icon-gplus" />
                  </span>
                  {/*
                  <span className="b">
                    <TiSocialGooglePlus className="icon-gplus" />
                  </span>
                  */}
                </a>
                <a href="https://twitter.com/TechInfini" className="icon_bar  icon_bar_twitter icon_bar_small">
                  <span className="t">
                    <TiSocialTwitter className="icon-twitter" />
                  </span>
                  {/*
                  <span className="b">
                    <TiSocialTwitter className="icon-twitter" />
                  </span>
                  */}
                </a>
                <a href="https://youtube.com/user/TechInfini" className="icon_bar  icon_bar_youtube icon_bar_small">
                  <span className="t">
                    <TiSocialYoutube className="icon-youtube" />
                  </span>
                  {/*
                  <span className="b">
                    <TiSocialYoutube className="icon-youtube" />
                  </span>
                  */}
                </a>
                <a href="https://www.linkedin.com/company/techinfini-solutions-pvt.-ltd." className="icon_bar  icon_bar_linkedin icon_bar_small">
                  <span className="t">
                    <TiSocialLinkedin className="icon-linkedin" />
                  </span>
                  {/*
                  <span className="b">
                    <TiSocialLinkedin className="icon-linkedin" />
                  </span>
                  */}
                </a>
              </div>
            </div>
            <div className=" col-md-7 contact-from">
              <form action="#" onSubmit={validationHandler}>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="username"
                      placeholder="Name"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="email">E-mail address:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="E-mail address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="phonenumber">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phonenumber"
                      name="phonenumber"
                      placeholder="Phone Number"
                      onChange={(e) => setPhonenumber(e.target.value)}
                      value={phonenumber}
                    />
                  </div>
                  <div className="col-md-12 mb-3 mt-4">
                    <label htmlFor="comment">Message:</label>
                    <textarea
                      rows="5"
                      className="form-control"
                      id="comment"
                      name="message"
                      placeholder="Write message here..."
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                    />
                  </div>
                  <div className="captcha">
                    <ReCaptchaComponent getOnChangeReCaptchaTokenandVerify={getOnChangeReCaptchaTokenandVerify} />
                  </div>
                  <div className="form-btn col-md-12 mb-3 mt-2">
                    <button type="submit" className="btn btn-primary btn-sm px-2 " ref={btnElement} disabled>
                      {!showLoader ? (
                        'Send message'
                      ) : (
                        <span className="contact-us-loader">
                          <Loader />
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="location">
        <ContactUsMap />
      </div>
    </section>
  )
}

export default ContactUsForm
