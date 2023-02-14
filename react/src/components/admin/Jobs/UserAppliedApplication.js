import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Loader from '../../utility/Loader.js'
import ApplyNowJob from '../../common/ApplyNowJob.js'
import {AllUserapiData} from "../../common/TableColum.js"
import { convertDateFormate } from '../../common/convertDateFormate.js'

const UserAppliedApplication = (props) => {
  const [show, setShow] = useState(false)
  const closeForm = () => setShow(false)
  const [showLoader, setshowLoader] = useState(false)
  const [adminJobs, setAdminJobs] = useState([])

  
  const [user, setUsers] = useState(AllUserapiData)
  const [optionjobPostTitle, setOptionJobPostTitle] = useState([])
  const [filterJobPostTitle, setFilterJobPostTitle] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const filterByJobpostTitle = (e) => {
    setFilterJobPostTitle(e.target.value)
  }
  const filterByStatusHandler = (e) => {
    setFilterStatus(e.target.value)
  }

  useEffect(() => {
    getUsers()
  }, [])
  useEffect(() => {
    getUsers()
  }, [filterJobPostTitle])
  useEffect(() => {
    getUsers()
  }, [filterStatus])

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token')

      let config = {
        headers: {
          headers: { 'Content-Type': 'application/pdf' },
          token: `Bearer${token}`,
        },
      }

      setshowLoader(true)
      await axios
        .get(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/applied-user?type=${filterJobPostTitle}&status=${filterStatus}`, config)
        .then((res) => {
          console.log('res.data.user', res.data.user)
          if (res.data.user.length === 0) {
            setshowLoader(false)
          }
          console.log(filterJobPostTitle, filterStatus, 'in res')
          let array = []
          let newarray = {}

          console.log(res.data)
          res.data.user.map((result) => {
            setshowLoader(false)

            array.push({
              name: result.name,
              applicationNumber:result.applicationNumber,
              status: result.status,
              jobposttitle: result.jobposttitle,
              updateddate: convertDateFormate(result.updatedAt),
              resume: (
                <div class="text-center">
                  <a className="btn btn-primary " href={`${process.env.REACT_APP_DOMAIN_URL}${result.url}`} target="_blank" download>
                    download
                  </a>
                </div>
              ),
              view_application: (
                <div class="text-center">
                  <Link className="btn btn-primary " to="/admin/single-user-applied-applications" state={{ id: result._id }}>
                    View
                  </Link>
                </div>
              ),
            })
          })
          newarray['rows'] = array
          newarray['columns'] = AllUserapiData['columns']
          console.log(newarray.rows.length, 'new arrray')

          if (newarray.length === 0) {
            setshowLoader(false)
          }

          setUsers(newarray)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const JobStausOptions = [
    'Open',
    'First_Interview_Scheduled',
    'Second_Interview_Scheduled',
    'HR_Interview_Scheduled',
    'Hired',
    'Offered',
    'Joining_Offered',
    'Joined',
    'Rejected',
  ]

  const getJobPostTitle = async () => {
    try {
      const token = localStorage.getItem('token')
      let config = {
        headers: {
          headers: { 'Content-Type': 'application/pdf' },
          token: `Bearer${token}`,
        },
      }

      console.log('hii', process.env.REACT_APP_DOMAIN_URL)
      await axios
        .get(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/all-posts`, config)
        .then((res) => {
          console.log("userAppied",res.data.jobPosts)
          setOptionJobPostTitle(res.data.jobPosts)
        })
        .catch((err) => {
          console.log('axios err', err)
        })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getJobPostTitle()
  }, [])

  const getAdminJobsByAdminId = async () => {
    try {
      setShow(true)
      const token = localStorage.getItem('token')

      let config = {
        headers: {
          headers: { 'Content-Type': 'application/pdf' },
          token: `Bearer${token}`,
        },
      }

      await axios
        .get(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/admin-jobs`, config)
        .then((res) => {
          console.log(res.data, 'admin jobs')
          setAdminJobs(res.data)
        })
        .catch((err) => {
          console.log('catch err', err)
        })
    } catch (err) {
      console.log('catch errrr', err)
    }
  }

  return (
    <div className="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6"></div>
          </div>
        </div>
      </section>
      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div className={`card ${showLoader && 'loader_show'} `}>
                {showLoader && <Loader />}
                <div class="card-header">
                  <div className="row mr-2">
                    <div className="col-md-3 ">
                      <h3 class="card-title">User Applied Applications</h3>
                    </div>

                    <div className="col-md-2 offset-8 ">
                      <div className="box">
                        <Button className="btn btn-primary " onClick={getAdminJobsByAdminId}>
                          <i class="nav-icon fa fa-plus"></i>&nbsp; Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4 mr-2">
                  <div className="col-md-3 offset-md-3">
                    <div className="box">
                      <label htmlFor="formGroupExampleInput">Filter JOBPOST TITLE</label>
                      <select className="browser-default custom-select" onChange={filterByJobpostTitle}>
                        <option value="">Filter JOBPOST Title</option>
                        {optionjobPostTitle.map((posttitle, index) => {
                          return (
                            <option key={index} value={posttitle}>
                              {posttitle}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="box">
                      <label htmlFor="formGroupExampleInput">Filter By STATUS</label>
                      <select className="browser-default custom-select" onChange={filterByStatusHandler}>
                        <option value="">Filter By Status</option>
                        {JobStausOptions.map((postStatus, index) => {
                          return (
                            <option key={index} value={postStatus}>
                              {postStatus}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="product-subbox m-4 mt-8">
                  <MDBDataTable entries={50}  striped bordered small  data={user} className="text-center" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>{show && <ApplyNowJob show={show} closeForm={closeForm} adminJobs={adminJobs} />}</div>
    </div>
  )
}

export default UserAppliedApplication
