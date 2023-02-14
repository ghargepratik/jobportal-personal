import React from 'react'
import { Modal } from 'react-bootstrap'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import ThankYou from './ThankYou'
import { CgCloseR } from 'react-icons/cg'
import Loader from '../utility/Loader'

const ApplyNowJob = (props) => {
  const [showModal, setShowModel] = useState(true)
  const [showLoader, setsetShowLoader] = useState(false)
  const [getAppplicationNo, setGetApplicationNo] = useState('')
  // const [input, setInput] = useState({
  //   name: '',
  //   email: '',
  //   phonenumber: '',
  //   experience: '',
  //   position: '',
  //   currentctc: '',
  //   expectedctc: '',
  //   user_file: '',
  // })
  const [input, setInput] = useState({
    name: '',
    email: '',
    phonenumber: '',
    position: '',
    currentctc: '',
    expectedctc: '',
    user_file: '',
  })

  const [showError, setShowError] = useState(false)
  const [selectedJob, setSelectedJob] = useState('')
  const [expInYear, setExpInYear] = useState('')
  const [expInMonth, setExpInMonth] = useState('')
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
    const MobileRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    const fileName = input.user_file.name
    const fileExt = fileName?.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName
    const acceptFormate = ['png', 'jpeg', 'pdf', 'odt', 'doc', 'docx', 'jpg']
    if (
      input.name.trim() === '' ||
      input.email.trim() === '' ||
      input.phonenumber.trim() === '' ||
      input.currentctc.trim() === '' ||
      input.expectedctc.trim() === '' ||
      input.user_file === ''
    ) {
      setShowError(true)
      toast.error('Please Fill All Fields')
    } else if (EmailRegex.test(input.email) === false) {
      console.log(input.email.length)
      setShowError(true)
      toast.error('Email is not valid')
    } else if (MobileRegex.test(input.phonenumber) === false) {
      console.log(input.phonenumber.length)
      setShowError(true)
      toast.error('Phone Number is not valid')
    } else if (input.user_file.size >= 5000000) {
      setShowError(true)
      toast.error('File size should be less than 5mb')
    } else if (expInYear === '') {
      console.log(expInYear.length)
      setShowError(true)
      toast.error('Please select Experience In Year')
    } else if (expInMonth === '') {
      console.log(expInMonth.length)
      setShowError(true)
      toast.error('Please select Experience In Month')
    } else if (!acceptFormate.includes(fileExt)) {
      setShowError(true)
      toast.error('Please Select png , jpeg, jpg, pdf , odt , doc and docx')
    } else {
      setShowError(false)
      submitHandler(e)
    }

    if (showError) {
      setShowError(false)
    }
  }

  const submitHandler = (e) => {
    setsetShowLoader(true)
    const token = localStorage.getItem('token')
    let config = {
      headers: {
        headers: { 'Content-Type': 'multipart/form-data' },
        token: `Bearer${token}`,
      },
    }

    let formData = new FormData()
    var adminSelectedJobPost = null
    if (props.adminJobs) {
      const findJobPostTitle = props.adminJobs.filter((jobs) => {
        return jobs._id === selectedJob
      })
      var adminSelectedJobPost = findJobPostTitle[0].jobtitle
      console.log(findJobPostTitle, adminSelectedJobPost, 'findSelectedjobObj')
    } else {
    }

    console.log('adminSelectedJobPost', adminSelectedJobPost)
    props.adminJobs && formData.append('jobid', selectedJob)
    props.adminJobs && formData.append('jobposttitle', adminSelectedJobPost)
    props.jobid && formData.append('jobid', props.jobid)
    props.jobposttitle && formData.append('jobposttitle', props.jobposttitle)
    formData.append('name', input.name)
    formData.append('email', input.email.toLowerCase())
    formData.append('phonenumber', input.phonenumber)
    formData.append('experience', `${expInYear} and ${expInMonth}`)
    formData.append('currentctc', input.currentctc)
    formData.append('expectedctc', input.expectedctc)
    formData.append('file', input.user_file)

    console.log('formdata experience>>>>>>>>>>>>>>', formData.get('experience'))
    try {
      axios
        .post(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/apply-job`, formData, config)
        .then((response) => {
          console.log(response.data.data.applicationNumber, 'res data applied job')
          setGetApplicationNo(response.data.data.applicationNumber)
          setShowModel(false)
          setsetShowLoader(false)
        })
        .catch((err) => {
          setsetShowLoader(false)
          console.log('catch err', err)
        })
    } catch (err) {
      setsetShowLoader(false)
      console.log('axios err', err)
    }
  }

  const selecteJobPost = (e) => {
    setSelectedJob(e.target.value)
  }

  const experienceInYear = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12+']
  const experienceInMonth = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

  console.log('EXPINYEAR>>>>>.', expInYear, 'EXPINMONTH>>>>', expInMonth)

  const ThankYouMessage = `You Have Sucessfully appied for the the post of <strong> ${
    props.jobposttitle || selectedJob
  }</strong> and Your application Number is <strong> ${getAppplicationNo}</strong>`

  return (
    <div style={{ 'pointer-events': 'none', position: 'fixed' }}>
      <Modal show={props.show} onHide={props.closeForm} backdrop="static">
        {showModal ? (
          <div>
            <Modal.Header>
              <Modal.Title>Apply For {props.jobposttitle}</Modal.Title>
              <CgCloseR className="btn-close" aria-label="Close" onClick={props.closeForm} />
            </Modal.Header>
            <Modal.Body>
              {props.adminJobs && (
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Select Job To Apply</label>
                  <select className="browser-default custom-select" name="jobid" onChange={selecteJobPost}>
                    <option name="jobid" value="">
                      SELECT JOBPOST
                    </option>
                    {props.adminJobs.map((option) => (
                      <option name="jobid" value={option._id}>
                        {option.jobtitle}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label for="exampleInputPassword1">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Your Name"
                  name="name"
                  onChange={inputHandler}
                  value={input.name}
                />
              </div>

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

              <div className="form-group">
                <label for="exampleInputPassword1">Your Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Phone Number"
                  name="phonenumber"
                  onChange={inputHandler}
                  value={input.phonenumber}
                />
              </div>

              <div className="form-group">
                <label htmlFor="formGroupExampleInput">Experience</label>
                <span>(eg. 2 year and 2 months)</span>
                <select className="browser-default custom-select mb-2" name="ExpInYear" onChange={(e) => setExpInYear(e.target.value)} required>
                  <option name="experience" value="">
                    SELECT Experience In Year
                  </option>
                  {experienceInYear.map((option, i) => (
                    <option value={`${option} year`}>{`${option} year`}</option>
                  ))}
                </select>
                <select className="browser-default custom-select mb-2" name="ExpInMonth" onChange={(e) => setExpInMonth(e.target.value)} required>
                  <option name="experience" value="">
                    SELECT Experience In Month
                  </option>
                  {experienceInMonth.map((option, i) => (
                    <option value={`${option} month`}>{`${option} month`}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label for="exampleInputPassword1">
                  Current CTC <small>(Per Anum)</small>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Current CTC"
                  name="currentctc"
                  onChange={inputHandler}
                  value={input.currentctc}
                />
              </div>

              <div className="form-group">
                <label for="exampleInputPassword1">Expected CTC </label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Expected CTC "
                  name="expectedctc"
                  onChange={inputHandler}
                  value={input.expectedctc}
                />
              </div>

              <div className="form-group">
                <label for="exampleInputPassword1">Upload Resume </label>
                <input
                  type="file"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="choose file "
                  name="user_file"
                  accept=".png,.jpg,.jpeg,.pdf,.doc"
                  onChange={fileHandler}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="submit" className="btn btn-primary" onClick={validationHandler}>
                Apply Now
              </button>

              {showLoader && (
                <div className="apply-now-loader">
                  <Loader />
                </div>
              )}
            </Modal.Footer>
          </div>
        ) : (
          <div>
            <Modal.Header>
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
