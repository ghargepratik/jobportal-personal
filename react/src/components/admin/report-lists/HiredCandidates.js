import React, { useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import Loader from '../../utility/Loader.js'
import { HiredCandidateapiData } from '../../common/TableColum.js'
import { convertDateFormate } from '../../common/convertDateFormate.js'

const HiredCandidates = () => {
  const [showLoader, setshowLoader] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [user, setUsers] = useState(HiredCandidateapiData)

 

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
      await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/reports/hired-list?type=h&start=${startDate}&end=${endDate}`, config).then((res) => {
        console.log('res.data.lists', res.data.lists)
        if (res.data.lists.length === 0) {
          setshowLoader(false)
        }
        let array = []
        let newarray = {}
        res.data.lists.map((result) => {
          setshowLoader(false)
          array.push({
            name: result.name,
            applicationNumber:result.applicationNumber,
            status: result.status,
            jobposttitle: result.jobposttitle,
            date: convertDateFormate(result.updatedAt),
            resume: (
              <a href={`${process.env.REACT_APP_DOMAIN_URL}${result?.url}`} rel="noreferrer" target="_blank" className="btn btn-primary" download >
                  download
                </a>
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
        newarray['columns'] = HiredCandidateapiData['columns']
        console.log(newarray.rows.length, 'new arrray')

        if (newarray.length === 0) {
          setshowLoader(false)
        }
        setUsers(newarray)
      })
    } catch (err) {
      console.log("error",err)
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
                  <h3 class="card-title">Hired Candidates List</h3>
                </div>
                <div class="card-body">
                  <div className="row ">
                    <div className="form-group col-lg-3 offset-4">
                      <label htmlFor="formGroupExampleInput">From</label>
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
                      <label htmlFor="formGroupExampleInput">To</label>
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
                      <Button className="btn btn-primary btn-block" onClick={() => getUsers()}>
                        Set Filter
                      </Button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-12 ">
                      <MDBDataTable entries={50} striped bordered small data={user} className="text-center" />
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

export default HiredCandidates
