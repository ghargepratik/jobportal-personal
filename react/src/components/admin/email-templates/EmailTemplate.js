import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TextEditor from '../../utility/TextEditor'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EmailTemplate = () => {
  const [emailMessage, setEmailMessage] = useState('')
  const [allemailMessage, setAllEmailMessage] = useState('')
  const [selectEmailType, setSelectEmailType] = useState('0')
  const token = localStorage.getItem('token')
  const apiUrl = process.env.REACT_APP_DOMAIN_URL

  let config = {
    headers: {
      headers: { 'Content-Type': 'multipart/form-data' },
      token: `Bearer${token}`,
    },
  }

  const getEmailTemplateDefaultData = () => {
    try {
      axios
        .get(`${apiUrl}/api/email-template/get`, config)
        .then((response) => {
          setAllEmailMessage(response.data.allTemplate)
          setEmailMessage(response.data.allTemplate[selectEmailType].template)
        })
        .catch((err) => {})
    } catch (err) {}
  }
  useEffect(() => {
    getEmailTemplateDefaultData()
  }, [selectEmailType])

  const updateEmailTemplateDefaultData = () => {
    let body = { template: emailMessage }
    try {
      console.log(allemailMessage[selectEmailType]._id, 'update id')
      axios
        .put(`${apiUrl}/api/email-template/update/${allemailMessage[selectEmailType]._id}`, body, config)
        .then((response) => {
          toast.success(response.data.message)
          setEmailMessage(response.data.updatedTemplate.template)
        })
        .catch((err) => {})
    } catch (err) {}
  }

  return (
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2"></div>
        </div>
      </section>
      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Email Templates</h3>
                </div>
                <div class="card-body">
                  <div className="row mb-4">
                    <div className="col-md-6 offset-6">
                      <div className="select-type">
                        <div className="row">
                          <div className="col-md-6 offset-2">
                            <select class="form-control" aria-label=".form-select-lg example" onChange={(e) => setSelectEmailType(e.target.value)}>
                              <option selected disabled>
                                Select Email Template Type
                              </option>
                              <option value="0" defaultChecked>
                                Interview Schedule
                              </option>
                              <option value="1">Apply Now</option>
                              <option value="2">Joining Document</option>
                              <option value="3">Offer Letter</option>
                            </select>
                          </div>
                          <div className="col-md-4">
                            <button className="edit_btn btn btn-primary btn-block" onClick={updateEmailTemplateDefaultData}>
                              Update Email
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="message-div ">
                    <TextEditor initialValue={emailMessage} name="emailMessage" fn={setEmailMessage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EmailTemplate
