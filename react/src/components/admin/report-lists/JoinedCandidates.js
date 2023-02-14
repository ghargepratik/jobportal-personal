import React, { useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import Loader from '../../utility/Loader.js'
import { JoinedCandidateapiData } from '../../common/TableColum.js'
import { convertDateFormate } from '../../common/convertDateFormate.js'

const JoinedCandidates = () => {
  const [showLoader, setshowLoader] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [user, setUsers] = useState(JoinedCandidateapiData)

  

  useEffect(() => {
    getUsers()
  }, [])

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
      await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/reports/joined-list?start=${startDate}&end=${endDate}`, config).then((res) => {
        console.log('res.data.lists', res.data.user)
        if (res.data.lists.length === 0) {
          setshowLoader(false)
        }

        let array = []
        let newarray = {}

        console.log(res.data)
        res.data?.lists.map((result) => {
          setshowLoader(false)
          console.log('result', result)
          console.log('joining data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', result?.offer_latter_id?.joining_date)
          array.push({
            // id: result._id,

            name: result.name,
            applicationNumber:result.applicationNumber,
            status: result.status,
            jobposttitle: result.jobposttitle,
            joining_date: convertDateFormate(result?.offer_latter_id?.joining_date),
            resume: (
              <div class="text-center">
                <a href={`${process.env.REACT_APP_DOMAIN_URL}${result.url}`} className="btn btn-primary " target="_blank" download>
                  download
                </a>
              </div>
            ),
            view_application: (
              <div class="text-center">
                <Link className="btn btn-primary" rel="noreferrer" to="/admin/single-user-applied-applications" state={{ id: result._id }}>
                  View
                </Link>
              </div>
            ),
          })
        })
        newarray['rows'] = array
        newarray['columns'] = JoinedCandidateapiData['columns']
        if (newarray.length === 0) {
          setshowLoader(false)
        }

        setUsers(newarray)
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">{/* <h1>Interview Scheduled List</h1> */}</div>
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
                  <h3 class="card-title">Joined Candidates List</h3>
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

export default JoinedCandidates
