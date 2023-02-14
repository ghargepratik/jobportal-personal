import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TextEditor from '../../utility/TextEditor.js'

const CreateJobPost = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState({
    companyname: '',
    tagline: '',
    email: '',
    linkdin: '',
    facebook: '',
    twitter: '',
    jobtitle: '',
    experience_from: '',
    experience_to: '',
    joblocation: '',
    rate: '',
    skillsrequired: '',
    jobtype: '',
    user_file: '',
    embed_a_map: '',
  })

  const [knowledge, setknowledge] = useState('')
  const [experiencedetail, setExperiencedetail] = useState('')
  const [eduction, setEduction] = useState('')
  const [jobdescription, setJobdescription] = useState('')

  const inputHandler = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }

  const fileHandler = (e) => {
    setInputValue({ ...inputValue, user_file: e.target.files[0] })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const token = localStorage.getItem('token')
    let config = {
      headers: {
        headers: { 'Content-Type': 'multipart/form-data' },
        token: `Bearer${token}`,
      },
    }

    let formData = new FormData()
    console.log(inputValue.companyname)
    formData.append('companyname', inputValue.companyname)
    formData.append('tagline', inputValue.tagline)
    formData.append('email', inputValue.email)
    formData.append('linkdin', inputValue.linkdin)
    formData.append('facebook', inputValue.facebook)
    formData.append('twitter', inputValue.twitter)
    formData.append('jobtitle', inputValue.jobtitle)
    formData.append('experience_from', inputValue.experience_from)
    formData.append('experience_to', inputValue.experience_to)
    formData.append('joblocation', inputValue.joblocation)
    formData.append('rate', inputValue.rate)
    formData.append('eduction', eduction)
    formData.append('experiencedetail', experiencedetail)
    formData.append('knowledgeof', knowledge)
    formData.append('jobdescription', jobdescription)
    formData.append('skillsrequired', inputValue.skillsrequired)
    formData.append('embed_a_map', inputValue.embed_a_map)
    formData.append('jobtype', inputValue.jobtype)
    formData.append('file', inputValue.user_file)
    formData.append('fileName', inputValue.user_file.name)
    console.log(inputValue.user_file.name)
    console.log('formData >>>>>>')
    console.log(config)
    try {
      axios
        .post(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/create`, formData, config)
        .then((response) => {
          toast.success(response?.data?.message)
          setIsLoading(false)
          setInputValue({
            companyname: '',
            tagline: '',
            email: '',
            linkdin: '',
            facebook: '',
            twitter: '',
            jobtitle: '',
            experience_from: '',
            experience_to: '',
            joblocation: '',
            rate: '',
            skillsrequired: '',
            embed_a_map: '',
            jobtype: '',
            user_file: '',
          })
          setknowledge('')
          setExperiencedetail('')
          setEduction('')
          setJobdescription('')
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.response?.data?.message)
          toast.error(err.response?.data?.errors[0]?.msg)

          setIsLoading(false)
        })
    } catch (err) {
      toast.error(err.response?.data?.message)
      setIsLoading(false)
    }
  }
  console.log('file', inputValue?.user_file)
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container"></div>
      </section>

      <section className="content">
        <div className="container">
          <div className="row mb-2">
            <div className="col-md-12">
              <div className="card ">
                <div className="card-header">
                  <h3 className="card-title">Create Job Post</h3>
                </div>

                <form>
                  <div className="card-body">
                    <div className="row mb-2">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label for="exampleInputEmail1">Your Company Name*</label>
                          <input
                            type="text"
                            className="form-control "
                            id="exampleInputEmail1"
                            placeholder="Enter Company Name"
                            name="companyname"
                            value={inputValue.companyname}
                            onChange={inputHandler}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label for="exampleInputPassword1">Your Company Tagline</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="tagline"
                            name="tagline"
                            value={inputValue.tagline}
                            onChange={inputHandler}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label for="exampleInputPassword1">Email Link*</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Email"
                            name="email"
                            value={inputValue.email}
                            onChange={inputHandler}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label for="exampleInputEmail1">Twitter Link</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Twitter"
                            name="twitter"
                            value={inputValue.twitter}
                            onChange={inputHandler}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label for="exampleInputPassword1">Linkdin Link</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Linkdin"
                            name="linkdin"
                            value={inputValue.linkdin}
                            onChange={inputHandler}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label for="exampleInputPassword1">Facebook Link</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Facebook"
                            name="facebook"
                            value={inputValue.facebook}
                            onChange={inputHandler}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label for="exampleInputEmail1">Job Title*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter jobtitle"
                            name="jobtitle"
                            value={inputValue.jobtitle}
                            onChange={inputHandler}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label for="exampleInputPassword1">Year of Experience*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="From"
                            name="experience_from"
                            value={inputValue.experience_from}
                            onChange={inputHandler}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label for="exampleInputPassword1">To*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="To"
                            name="experience_to"
                            value={inputValue.experience_to}
                            onChange={inputHandler}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label for="exampleInputEmail1">Job Location*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleJobLocation"
                            placeholder="Enter Job Location"
                            name="joblocation"
                            value={inputValue.joblocation}
                            onChange={inputHandler}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label for="exampleInputPassword1">
                            Job Type <small>( Separate with Comma eg.fulltime,parttime)*</small>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Job Type"
                            name="jobtype"
                            value={inputValue.jobtype}
                            onChange={inputHandler}
                          />
                        </div>
                      </div>
                      {/* <div className="col-md-4">
                        <div className="form-group">
                          <label for="exampleInputPassword1">Rate</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Rate"
                            name="rate"
                            value={inputValue.rate}
                            onChange={inputHandler}
                          />
                        </div>
                      </div> */}
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputEmail1">Required Education*</label>
                          <TextEditor initialValue={eduction} name="eduction" fn={setEduction} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputPassword1">Experience In Details*</label>
                          <TextEditor initialValue={experiencedetail} name="experiencedetail" fn={setExperiencedetail} />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputEmail1">Required Knowledge of*</label>
                          <TextEditor initialValue={knowledge} name="knowledgeof" fn={setknowledge} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputPassword1">Job Description*</label>
                          <TextEditor initialValue={jobdescription} name="jobdescription" fn={setJobdescription} />
                        </div>
                      </div>
                    </div>

                    <div className="row p-3">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            Skills Required <small>( Separate with Comma eg.C,C++,HTML)*</small>
                          </label>
                          <textarea
                            type="textarea"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter skillsrequired"
                            name="skillsrequired"
                            value={inputValue.skillsrequired}
                            onChange={inputHandler}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputPassword1">Add Emabed Map Link</label>
                          <textarea
                            type="textarea"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Map Location"
                            name="embed_a_map"
                            value={inputValue.embed_a_map}
                            onChange={inputHandler}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label for="exampleInputFile">Upload LOGO</label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="exampleInputFile"
                            name="user_file"
                            accept=".png,.jpg,.jpeg,.pdf,.doc"
                            onChange={fileHandler}
                          />
                          {console.log("fileName",inputValue?.user_file)}
                          <label className="custom-file-label" for="exampleInputFile">
                            {inputValue.user_file ? <span>name-{inputValue?.user_file?.name} </span> : <span>Choose file</span>}
                          </label>
                        </div>
                        {/* <div className="input-group-append">
                          <span className="input-group-text">Upload</span>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary" onClick={submitHandler}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CreateJobPost
