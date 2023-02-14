import React from 'react'
import { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { useHttpClient } from '../../utility/useHttpHooks.js'
import { toCreateCardInPMPList, ChangeListIdInPMPAccordingToStatus, loginInPMP } from '../../utility/pmp/createCardInPmpList.js'

const SheduleInterview = (props) => {
  console.log('SHEDULE_INTERVIEW_RENDER')
  const [input, setInput] = useState({
    date: '',
    time: '',
    interviewername: '',
    intervieweremail: '',
  })
  const [interview, setInterview] = useState('')
  const [interviewaddress, setInterviewaddress] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [addresses, setAddresses] = useState([])

  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const validationHandler = (e) => {
    e.preventDefault()
    console.log('check validation')

    if (interview === '') {
      setShowError(true)
      toast.error('Please select Interview Type')
    } else if (interviewaddress === '') {
      setShowError(true)
      toast.error('Please select Address')
    } else if (input.date === '' || input.time === '') {
      setShowError(true)
      toast.error('Please Fill Date and Time')
    } else {
      setShowError(false)
      setErrorMessage('')
      submitHandler()
      console.log('Validation Success')
    }
  }

  /******************************************FETCH ALL ADDRESSS********************************* */
  //FETCH ALL ADDRESSS
  const getAllcommentAddress = async () => {
    const token = localStorage.getItem('token')

    const res = await sendRequest(
      `${process.env.REACT_APP_DOMAIN_URL}/api/address/get-all`,
      'GET',
      {},
      {
        Accept: 'application',
        'Content-Type': 'application/json',
        token: `Bearer${token}`,
      }
    )
    // console.log('🚀 ~ file: SheduleInterview.js ~ line 63 ~ getAllcommentAddress ~ res', res.data)

    setAddresses(res.data.addresses.reverse())
  }

  useEffect(() => {
    getAllcommentAddress()
    loginInPMP()
  }, [])

  /***************************************************************************************************************** */

  /*********************************************Submit Handler**************************************************************** */
  const submitHandler = (e) => {
    try {
      if (!errorMessage) {
        let body = {
          ...input,
          interviewaddress: interviewaddress,
          status: interview,
          userid: props.userid,
          singlejobapplicationid: props.singlejobapplicationid,
        }
        console.log('🚀 ~ file: SheduleInterview.js ~ line 85 ~ submitHandler ~ body', body)
        const token = localStorage.getItem('token')
        let config = {
          headers: {
            headers: { 'Content-Type': 'multipart/form-data' },
            token: `Bearer${token}`,
          },
        }

        axios
          .post(`${process.env.REACT_APP_DOMAIN_URL}/api/interview/schedule`, body, config)
          .then((response) => {
            toast.success('Interview Scheduled')
            console.log('SheduleInterview res.data>>><', response.data)
            props.getUserJobApplicationInfo(props.singlejobapplicationid)

            if (response?.data?.userInfo?.pmpCardId) {
              console.log('pmpCardId is there>>><<<<<><><><><><><><', response?.data?.userInfo?.pmpCardId)
              ChangeListIdInPMPAccordingToStatus(response.data)
            } else {
              toCreateCardInPMPList(interview, response?.data, props.singlejobapplicationid)
            }

            props.closeForm()
          })
          .catch((err) => {
            console.log('catch err', err)
            toast.error('Something Went Wrong')
          })
      }
    } catch (err) {
      console.log('axios err', err)
    }
  }

  console.log('interviewaddress>>>>', interviewaddress)
  return (
    <div>
      <div>
        <Modal show={props.show} onHide={props.closeForm}>
          <Modal.Header>
            <Modal.Title>Schedule Interview</Modal.Title>
          </Modal.Header>
          {showError && (
            <h6 className="text-center text-danger pt-4 error_message">
              <span>{`Error : ${errorMessage}`}</span>
            </h6>
          )}

          <Modal.Body>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Select Schedule Interview</label>
              <select name="status" value={interview} onChange={(e) => setInterview(e.target.value)} className="browser-default custom-select">
                <option value="" selected>
                  PLEASE SELECT INTERVIEW TYPE
                </option>
                <option value="First_Interview_Scheduled">First Interview</option>
                <option value="Second_Interview_Scheduled">Second Interview</option>
                <option value="HR_Interview_Scheduled">HR Interview</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Time</label>
              <input
                type="time"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Time"
                name="time"
                value={input.time}
                onChange={inputHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Date</label>
              <input
                type="date"
                className="form-control"
                id="formGroupExampleInput"
                name="date"
                placeholder="Date"
                value={input.date}
                onChange={inputHandler}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Select Address</label>
              <select
                name="interviewaddress"
                value={interviewaddress}
                onChange={(e) => setInterviewaddress(e.target.value)}
                className="browser-default custom-select"
              >
                <option value="" selected>
                  PLEASE SELECT ADDRESS
                </option>
                {addresses &&
                  addresses?.map((address) => {
                    return (
                      <option name="interviewaddress" value={address.addresstext}>
                        {address?.addresstext}
                      </option>
                    )
                  })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Interviewer Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                name="interviewername"
                placeholder="interviewer name"
                value={input.interviewername}
                onChange={inputHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Interviewer email</label>
              <input
                type="email"
                className="form-control"
                id="formGroupExampleInput"
                name="intervieweremail"
                placeholder="interviewer email"
                value={input.intervieweremail}
                onChange={inputHandler}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={validationHandler}>
              submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default SheduleInterview
