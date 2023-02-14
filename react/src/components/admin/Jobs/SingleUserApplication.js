import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import PostComment from './PostComment.js'
import { Button } from 'react-bootstrap'
import SheduleInterview from './SheduleInterview'
import GenerateLetterForm from './GenerateLetterForm'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { ChangeListIdInPMPAccordingToStatus, loginInPMP } from '../../utility/pmp/createCardInPmpList.js'

const SingleUserApplication = () => {
  console.log('SINGLE_USER_APPLICATION_RENDER')
  let location = useLocation()
  const API_URL = process.env.REACT_APP_DOMAIN_URL
  const [show, setShow] = useState(false)
  const closeForm = () => setShow(false)
  let applicationId = ''
  const [showGenerateLetterForm, setShowGenerateLetterForm] = useState(false)
  const [letterType, setLetterType] = useState('')
  const [showHrModule, setShowHrModule] = useState(false)
  const [userInfo, setInfoUser] = useState('')
  const [updateStatus, setUpdateStatus] = useState('')
  const [extenction, setExtenction] = useState('')

  const getSingleJobApplicationId = location.state.id
  applicationId = getSingleJobApplicationId

  useEffect(() => {
    getUserJobApplicationInfo(getSingleJobApplicationId)
    setTimeout(() => {}, 3000)
  }, [])

  const closeGenerateLetterForm = (letterresponce) => {
    if (letterresponce) {
      // console.log("props closeGenerateLetterForm call",letterresponce,"ID",applicationId)
      getUserJobApplicationInfo(applicationId)
    }
    setShowGenerateLetterForm(false)
  }

  const showForm = () => {
    setShow(true)
  }

  const showGenerateLetterFormFunction = (Type) => {
    setShowGenerateLetterForm(true)
    setLetterType(Type)
  }

  const getUserJobApplicationInfo = async (id) => {
    try {
      const token = localStorage.getItem('token')
      let config = {
        headers: {
          headers: { 'Content-Type': 'application/pdf' },
          token: `Bearer${token}`,
        },
      }

      await axios.get(`${API_URL}/api/jobs/applied-user-info/${id}`, config).then((res) => {
        // console.log('res.data', res.data.userInfo.url)
        setInfoUser(res.data.userInfo)
        getExtenction(res.data.userInfo.url)
        if (res.data.userInfo.status === 'Hired') {
          setShowHrModule(true)
        }
      })
    } catch (err) {
      toast.error('Something Went Error.')
      console.log('err', err)
    }
  }

  const updateStatusHandler = async (id) => {
    try {
      const token = localStorage.getItem('token')
      let config = {
        headers: {
          headers: { 'Content-Type': 'application/pdf' },
          token: `Bearer${token}`,
        },
      }

      await axios.patch(`${API_URL}/api/jobs/applied-user-info/${id}`, { status: updateStatus }, config).then((res) => {
        console.log('update res.data', res.data)
        toast.success('Status Changed.')
        setInfoUser(res.data.userInfo)
        getUserJobApplicationInfo(id)
        loginInPMP()

        setTimeout(() => {
          ChangeListIdInPMPAccordingToStatus(res.data) //TO change ListId of Card In PMP {This Fun Is For PMP }
        }, 3000)
      })
    } catch (err) {
      toast.error('Something Went Error.')
    }
  }

  const sendDocumentationMailfun = async (id) => {
    // console.log('id', id)
    try {
      const token = localStorage.getItem('token')
      let config = {
        headers: {
          headers: { 'Content-Type': 'application/pdf' },
          token: `Bearer${token}`,
        },
      }
      await axios.get(`${API_URL}/api/jobs/applied-user-info/joining-doc-mail/${id}`, config).then((res) => {
        console.log('res', res)
        toast.success(res?.data?.message || 'Mail Send Successfully')
      })
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something Went Error.')
      console.log('err', err)
    }
  }

  const memoComponentComment = useMemo(() => {
    // console.log(`sinngle job POST CMT CALL - ${applicationId}`)
    return <PostComment singleJobApplicationId={applicationId} UserInfoStatus={userInfo.status} />
  }, [userInfo.status])

  const getExtenction = (link) => {
    let arr = link.split('.')
    let ext = arr[arr.length - 1]
    setExtenction(ext)
  }
  return (
    <div className="content-wrapper">
      <div className="container pt-4">
        <div className="row">
          <div className="col-8 comment-box">
            <div className="flexbox">
              <div className="user-details">
                <h4>
                  <span className="text-capitalize">{userInfo.name}</span>
                </h4>
                <h4>
                  <span style={{ fontSize: '14px' }}>
                    Status- <span className="primary">{userInfo.status}</span>
                  </span>
                </h4>
              </div>
              <div className="user_info_btn">
                <a href={`${API_URL}${userInfo.url}`} target="_blank" rel="noreferrer" download className="btn btn-block btn-info mr-2">
                  Download Resume
                </a>
                <br />
                <a
                  href={
                    extenction == 'doc' || extenction == 'docx'
                      ? `https://docs.google.com/gview?url=${process.env.REACT_APP_DOMAIN_URL}${userInfo.url}&embedded=true`
                      : `${API_URL}${userInfo.url}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-block btn-info mr-2"
                >
                  Preview Resume
                </a>
                <br />
                <a onClick={showForm} className="btn btn-block btn-info ">
                  Schedule Interview
                </a>
              </div>
            </div>
            <hr />
            <div class="comm-box">
              {memoComponentComment}
              {/* <Comment singleJobApplicationId={userInfo._id} /> */}
            </div>
          </div>

          <div className="col-4">
            <div className="job-disrption">
              <div className="user_info">
                <ul>
                  <li>
                    <b>Job Title-</b>
                    <span>{userInfo.jobposttitle}</span>
                  </li>
                  <li>
                    <b>Email-</b>
                    <span>{userInfo.email}</span>
                  </li>
                  <li>
                    <b>Phone Number-</b> <span>{userInfo.phonenumber}</span>
                  </li>
                  <li>
                    <b>Experience</b> -<span>{userInfo.experience}</span>
                  </li>

                  <li>
                    <b>Current CTC (Per Anum)</b>-<span>{userInfo.currentctc} </span>
                  </li>
                  <li>
                    <b>Expected CTC-</b>
                    <span>{userInfo.expectedctc}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className=" update-status mt-4 py-2">
              <h5 className="update-status_heading">Update Status</h5>
              <div className="form-group">
                <label htmlFor="formGroupExampleInput">Select Status to Change Interview</label>
                <select
                  name="status"
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value)}
                  className="browser-default custom-select"
                >
                  <option value="" selected>
                    PLEASE SELECT INTERVIEW TYPE
                  </option>
                  {/*<option value="First_Interview_Scheduled">First Interview Scheduled</option>
                <option value="Second_Interview_Scheduled">Second Interview Scheduled</option>*/}
                  <option value="HR_Interview_Scheduled">HR Interview Scheduled</option>
                  <option value="Hired">Hired </option>
                  <option value="Offered">Offered </option>
                  <option value="Joiningoffered">Joiningoffered</option>
                  <option value="Joined">Joined</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <Button variant="primary" disabled={!updateStatus} onClick={() => updateStatusHandler(applicationId)}>
                UPDATE
              </Button>
            </div>

            {(userInfo.status === 'Hired' ||
              userInfo.status === 'Offered' ||
              userInfo.status === 'Joiningoffered' ||
              userInfo.status === 'Joined') && (
              <div className="hr-letters py-2 mt-2">
                <div className="hr-letters_sub py-2">
                  <Button
                    className="btn btn-block btn-dark btn-flat mb-2"
                    variant="dark button"
                    onClick={() => sendDocumentationMailfun(applicationId)}
                  >
                    Send Doc. email
                  </Button>
                  <Button
                    className="btn btn-block btn-dark btn-flat mb-2"
                    variant="dark button"
                    onClick={() => showGenerateLetterFormFunction('offer-letter')}
                  >
                    Generate Offer Letter
                  </Button>
                  <Button
                    className="btn btn-block btn-dark btn-flat mb-2"
                    variant="dark button"
                    onClick={() => showGenerateLetterFormFunction('joining-letter')}
                  >
                    Generate Joining Letter
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          {show && (
            <SheduleInterview
              getUserJobApplicationInfo={getUserJobApplicationInfo}
              show={show}
              userid={userInfo.userid}
              singlejobapplicationid={userInfo._id}
              closeForm={closeForm}
            />
          )}
        </div>

        <div>
          {showGenerateLetterForm && (
            <GenerateLetterForm
              showGenerateLetterForm={showGenerateLetterForm}
              letterType={letterType}
              userid={userInfo.userid}
              singlejobapplicationid={userInfo._id}
              closeGenerateLetterForm={closeGenerateLetterForm}
            />
          )}
        </div>

        {/*
            <div className="row mt-4">
              <div className="col-12 comment-box">
                  <div className="flexbox">
                    {
                      extenction && (
                        (extenction=="doc" || extenction=="docx") 
                        ?
                        <iframe src={`https://docs.google.com/gview?url=${process.env.REACT_APP_DOMAIN_URL}${userInfo.url}&embedded=true`} height="600px" width="500px"></iframe>
                        :
                        <iframe src={process.env.REACT_APP_DOMAIN_URL+userInfo.url} width="100%" height="700px" ></iframe>
                      )
                      
                    }
                  </div>
              </div>
            </div>
          */}
      </div>
    </div>
  )
}

export default SingleUserApplication
