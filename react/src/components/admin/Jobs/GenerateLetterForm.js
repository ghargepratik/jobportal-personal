import React from 'react'
import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const GenerateLetterForm = (props) => {
  const [input, setInput] = useState({
    ctc: '',
    joiningdate: '',
    bondperiod: '',
    bondcondition: '',
    specialinstruction: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const validationHandler = (e) => {
    e.preventDefault()
    if (
      input.ctc.trim() === '' ||
      input.joiningdate.trim() === '' ||
      input.bondperiod.trim() === '' ||
      input.bondcondition.trim() === '' ||
      input.specialinstruction.trim() === ''
    ) {
      setShowError(true)
      setErrorMessage('Please Fill All Fields')
    } else {
      setShowError(false)
      setErrorMessage('')
      submitHandler()
      console.log('Validation success')
    }
  }
  const submitHandler = () => {
    try {
      if (!errorMessage) {
        let body = { ...input, userid: props.userid, singlejobapplicationid: props.singlejobapplicationid }
        const token = localStorage.getItem('token')
        let config = {
          headers: {
            headers: { 'Content-Type': 'multipart/form-data' },
            token: `Bearer${token}`,
          },
        }

        axios
          .post(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/applied-user-info/${props.letterType}`, body, config)
          .then((response) => {
            console.log(response.data, 'res data applied job')
            toast.success(response?.data?.message)
            props.closeGenerateLetterForm(response.data);
          })
          .catch((err) => {
            console.log('catch err', err)
            toast.error(err.response?.data?.errors[0]?.msg)
          })
      }
    } catch (err) {
      console.log('axios err', err)
      toast.error('Something Went Error.')
    }
  }

  return (
    <div>
      <div>
        <Modal show={props.showGenerateLetterForm} onHide={props.closeGenerateLetterForm}>
          <Modal.Header >
            <Modal.Title>
              Generate <span>{props.letterType}</span>
            </Modal.Title>
          </Modal.Header>
          {showError && (
            <h6 className="text-center text-danger pt-4 error_message">
              <span>{`Error : ${errorMessage}`}</span>
            </h6>
          )}

          <Modal.Body>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">CTC Detail (Per Month)</label>
              <input
                type="input"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="CTC Detail (Per Month)"
                name="ctc"
                value={input.ctc}
                onChange={inputHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Joining Date</label>
              <input
                type="date"
                className="form-control"
                id="formGroupExampleInput"
                name="joiningdate"
                placeholder="Joining Date"
                value={input.joiningdate}
                onChange={inputHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Bond Period (In Months)</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                name="bondperiod"
                placeholder="Bond Period"
                value={input.interviewername}
                onChange={inputHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Bond Condition</label>
              <textarea
                className="form-control"
                style={{ minWidth: '100%' }}
                id="formGroupExampleInput"
                name="bondcondition"
                placeholder="Bond Condition"
                value={input.intervieweremail}
                onChange={inputHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Special Instruction</label>
              <textarea
                className="form-control"
                style={{ minWidth: '100%' }}
                id="formGroupExampleInput"
                name="specialinstruction"
                placeholder="Special Instruction"
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

export default GenerateLetterForm
