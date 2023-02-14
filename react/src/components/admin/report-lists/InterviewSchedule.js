import React, { useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import Loader from '../../utility/Loader.js'
import { InterviewSheduleapiData } from '../../common/TableColum.js'


const InterviewSchedule = () => {
  const [showLoader, setshowLoader] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [user, setUsers] = useState(InterviewSheduleapiData)

  const convertDateFormate = (time) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }
    let date = new Date(time).toLocaleDateString('en-EN', options)
    date = date.replaceAll('/', '-')
    return date
  }

  useEffect(() => {
    getUsers()
  }, [])

  function tConvert(time) {
    time = time?.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]
    if (time.length > 1) {
      time = time.slice(1)
      time[5] = +time[0] < 12 ? 'AM' : 'PM'
      time[0] = +time[0] % 12 || 12
    }
    return time.join(' ')
  }

  const getUsers = async () => {
    try {
      console.log('mmmmm')
      const token = localStorage.getItem('token')

      let config = {
        headers: {
          headers: { 'Content-Type': 'application/pdf' },
          token: `Bearer${token}`,
        },
      }

      setshowLoader(true)
      await axios
        .get(`${process.env.REACT_APP_DOMAIN_URL}/api/reports/scheduled-interview-list?start=${startDate}&end=${endDate}`, config)
        .then((res) => {
          // console.log('res.data.lists', res.data.lists)
          if (res.data.lists.length === 0) {
            setshowLoader(false)
          }

          let array = []
          let newarray = {}

          res.data.lists.reverse().map((result) => {
            console.log('result', result)
            setshowLoader(false)
            console.log('result', result)
            array.push({
              name: result?.name,
              applicationNumber:result.applicationNumber,
              status: result?.status,
              jobposttitle: result?.jobposttitle,
              interview_date: convertDateFormate(result?.scheduled_interview_id?.date),
              interview_time: tConvert(result?.scheduled_interview_id?.time),
              resume: (
                <a href={`${process.env.REACT_APP_DOMAIN_URL}${result?.url}`} rel="noreferrer" target="_blank" className="btn btn-primary" download >
                  download
                </a>
              ),
              view_application: (
                <div class="text-center">
                  <Link className="btn btn-primary " to="/admin/single-user-applied-applications" state={{ id: result?._id }}>
                    View
                  </Link>
                </div>
              ),
            })
          })
          newarray['rows'] = array
          newarray['columns'] = InterviewSheduleapiData['columns']
          console.log(newarray.rows.length, 'new arrray')

          if (newarray.length === 0) {
            setshowLoader(false)
          }
          setUsers(newarray)
        })
    } catch (err) {
      console.log("err",err);
    }
  }

  return (
    <div class="content-wrapper">
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
                  <h3 class="card-title">Interview Scheduled List</h3>
                </div>
                <div class="card-body">
                  <div className="row ">
                    <div className="form-group col-lg-3 offset-4">
                      <label htmlFor="formGroupExampleInput">Select Date From</label>
                      <input
                        type="date"
                        className="form-control"
                        id="formGroupExampleInput"
                        name="date"
                        placeholder="Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-lg-3">
                      <label htmlFor="formGroupExampleInput">Select Date To</label>
                      <input
                        type="date"
                        className="form-control"
                        id="formGroupExampleInput"
                        name="date"
                        placeholder="Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-2 mt-3 ">
                      <Button disabled={!(startDate && endDate)} className="btn btn-primary btn-block" onClick={() => getUsers()}>
                        Set Filter
                      </Button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-12 ">
                      <MDBDataTable entries={50} striped bordered small data={user} className="text-center"/>
                    </div>
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

export default InterviewSchedule
