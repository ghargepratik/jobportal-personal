import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import ToggleJobStatus from './ToggleJobStatus'
import Loader from '../../utility/Loader'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { convertDateFormate } from '../../common/convertDateFormate'

const JobPostList = (props) => {
  const [showLoader, setshowLoader] = useState(false)
  const [fetchData, setFetchData] = useState([])
  const [search, setSearch] = useState('')
  const fetchJobPost = () => {
    try {
      const token = localStorage.getItem('token')
      let config = {
        headers: {
          headers: { 'Content-Type': 'multipart/form-data' },
          token: `Bearer${token}`,
        },
      }
      setshowLoader(true)
      axios
        .get(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/admin-jobs`, config)
        .then((response) => {
          console.log(response)
          console.log(response.data, 'res data job post')
          setshowLoader(false)
          setFetchData(response.data.reverse())
        })
        .catch((err) => {
          console.log('catch err', err)
        })
    } catch (err) {
      console.log('catch err', err)
    }
  }
  useEffect(() => {
    fetchJobPost()
  }, [])

  const deleteJobPost = (id) => {
    try {
      const token = localStorage.getItem('token')
      let config = {
        headers: {
          headers: { 'Content-Type': 'multipart/form-data' },
          token: `Bearer${token}`,
        },
      }
      axios
        .delete(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/delete/${id}`, config)
        .then((response) => {
          toast.success('Successfully Deleted')
          console.log(response.data, 'res data job post delete')
          fetchJobPost()
        })
        .catch((err) => {
          console.log('catch err', err)
          toast.error(err.response?.data?.errors[0]?.msg)
        })
    } catch (err) {
      console.log('catch err', err)
    }
  }
  const searchData = (data) => {
    return data.filter(
      (jobs) =>
        jobs.jobtitle.toLowerCase().includes(search) || jobs.email.toLowerCase().includes(search) || jobs.joblocation.toLowerCase().includes(search)
    )
  }

  return (
    <>
      <div className="row p-2 mt-2 mb-4 mr-2">
        <div className="col-md-4 offset-md-8">
          <input
            type="search"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="SEARCH......"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>

      <div className="main-container">
        <div className="sub-container">
          {showLoader && <Loader />}
          {fetchData ? (
            searchData(fetchData).map((item) => {
              return (
                <div>
                  <div className="container  shadow-sm-new p-3 mb-5 bg-custom rounded" key={item._id}>
                    <div className="row p-2 align-items-center">
                      <div className="col-md-6 p-0">
                        <h4 className="card-title text-capitalize">{item.jobtitle}</h4>
                      </div>
                      <div className="col-md-6 d-flex flex-row-reverse">
                        <ul className="status-list d-flex">
                          <li>
                            <div>
                              <ToggleJobStatus getAdminSingleJobid={item._id} initialStatusValue={item.jobstatus} />
                            </div>
                          </li>
                          <li>
                            <div onClick={() => deleteJobPost(item._id)}>
                              {' '}
                              <MdDelete />
                            </div>
                          </li>
                          <li>
                            <div>
                              <Link to="/admin/edit-job-post" state={{ id: item._id }}>
                                {' '}
                                <FiEdit />
                              </Link>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row p-2">
                      <div>
                        <ul className="d-flex text-capitalize projectCard">
                          <li className="">
                            Employment Type:-<span>{item.jobtype[0]}</span>
                          </li>
                          <li>
                            Experience:-
                            <span>{`${item.experience_from} to ${item.experience_to} years`}</span>
                          </li>
                          <li>
                            Location:-<span>{item.joblocation}</span>
                          </li>
                          <li>
                            Posted Date : <span>{convertDateFormate(item.updatedAt)}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row p-2 d-flex mt-2">
                      <h6 className="bar_line">
                        <span>Key Skills </span>
                      </h6>
                    </div>
                    <div className="row p-2 ml-4 text-capitalize">
                      <div>
                        <ul className="list-inline">
                          {item?.skillsrequired?.map((skill) => {
                            // console.log("skill", skill);
                            return <small className="badge badge-warning ml-2">{skill}</small>
                          })}
                        </ul>
                      </div>
                    </div>
                    <div className="row p-2 d-flex mt-2">
                      <h6 className="bar_line">
                        <span>Job Description </span>
                      </h6>
                    </div>

                    <div className="row p-2">
                      <p>
                        <div
                          className="job-posts "
                          dangerouslySetInnerHTML={{
                            __html: item.jobdescription,
                          }}
                        ></div>
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p>Data not Found</p>
          )}
        </div>
      </div>
    </>
  )
}

export default JobPostList
