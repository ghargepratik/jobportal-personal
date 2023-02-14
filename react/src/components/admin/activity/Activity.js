import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom'
import Loader from '../../utility/Loader.js'
import { apiData } from '../../common/TableColum.js'
import { convertDateFormate } from '../../common/convertDateFormate.js'

// 1=>register action
// 2=>login action
// 3=>Apply on Specifice job
// 4=>Create Job action (when its admin)
// 5=>Update Job action (when its admin)
// 6=>Delete Job action (when its admin)
// 7=>Schedule interview
// 8=>comment on specific job application

const myShodow = {
  paddingTop: '1rem',
  backgroundColor: '#fff',
  borderRadius: '1rem',
  padding: '50px',
  boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
}

const Activity = () => {
  const [show, setShow] = useState(false)
  const closeForm = () => setShow(false)
  const [showLoader, setshowLoader] = useState(false)
  const [user, setUsers] = useState(apiData)

  

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
      await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/activity/list`, config).then((res) => {
        if (res.data.list.length === 0) {
          setshowLoader(false)
        }

        let array = []
        let newarray = {}
        res.data.list.map((result) => {
          console.log("🚀 ~ file: Activity.js ~ line 58 ~ res.data.list.map ~ result", result)
          setshowLoader(false)
          var action = switchResultFunction(Number(result.actionType))
          console.log('result', result.actionType, 'app_id', result?.application_id?.jobposttitle, 'job_id', result?.job_id?.jobposttitle)
          array.push({
            name: result?.userid?.username,
            activity: action,
            time: convertDateFormate(result.updatedAt),
            activityon: result?.application_id?.jobposttitle || result?.job_id?.jobtitle,
            view_application: (
              <Link className="btn btn-block btn-dark btn-flat" to="/admin/single-job-application" state={{ id: result._id }}>
                View
              </Link>
            ),
          })
        })
        newarray['rows'] = array.reverse()
        newarray['columns'] = apiData['columns']
        if (newarray.length === 0) {
          setshowLoader(false)
        }
        setUsers(newarray)
      })
    } catch (err) {
      console.log(err)
    }
  }

  function switchResultFunction(action) {
    switch (action) {
      case 1:
        return 'Register'
      case 2:
        return 'Login'
      case 3:
        return 'Apply On'
      case 4:
        return 'Create Job'
      case 5:
        return 'Update Job'
      case 6:
        return 'Delete Job'
      case 7:
        return 'Schedule Interview'
      case 8:
        return 'Comment On'
      default:
        return null
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
                  <h3 class="card-title">Activity List</h3>
                </div>
                <div class="card-body">
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

export default Activity
