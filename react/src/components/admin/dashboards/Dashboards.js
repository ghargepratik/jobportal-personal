import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const Dashboards = () => {
  const [totalData, setTotalData] = useState({})

  useEffect(() => {
    submitHandler()
  }, [])

  const submitHandler = () => {
    try {
      const token = localStorage.getItem('token')
      let config = {
        headers: {
          headers: { 'Content-Type': 'multipart/form-data' },
          token: `Bearer${token}`,
        },
      }

      axios
        .get(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/total-document/`, config)
        .then((response) => {
          setTotalData(response.data)
          toast.success(response?.data?.message)
        })
        .catch((err) => {
          toast.error(err.response?.data?.errors[0]?.msg)
        })
    } catch (err) {}
  }

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">{/* <h1 className="m-0">Dashboard</h1> */}</div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{totalData.totalJobs}</h3>
                    <p>Total Jobs</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag"></i>
                  </div>
                  <Link to="/admin/create-job-post" className="small-box-footer">
                    Create job <i className="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>
                      {totalData.totalJobApplication}
                      <sup style={{ fontSize: '20px' }}></sup>
                    </h3>
                    <p>Total Job Application</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars"></i>
                  </div>

                  <Link to="/admin/user-applied-applications" className="small-box-footer">
                    Job Application <i className="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Dashboards
