import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { Card, Row, Col, Container } from 'react-bootstrap'
import { GoLocation } from 'react-icons/go'
import { MdOutlineWorkOutline, MdDone } from 'react-icons/md'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import JobImage from '../../../assets/images/job.png'
import Loader from '../../utility/Loader.js'
import './joblist.css'

export default function RecentJobList(props) {
  const [offset, setOffset] = useState(1)
  const [perPage] = useState(4)
  const [pageCount, setPageCount] = useState(0)
  const [job, setjob] = useState([])
  const [showLoader, setShowLoader] = useState(false)
  const [appiedJobs, setAppliedJobs] = useState([])
  const location = useLocation()
  const params = useParams()

  const currentId = location?.state?.job_id || params.id

  //FETCH RECENT JOB LIST --Except current job thai is show on jobIndex page
  const fetchData = async (currentJobId) => {
    console.log('🚀 ~ file: RecentJobList.js ~ line 27 ~ fetchData ~ currentJobId', currentJobId)

    setShowLoader(true)
    const response = await fetch(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/get-recents-job/${currentJobId}?page=${offset}&limit=${perPage}`)
    const jobData = await response.json()
    setjob(jobData.job)
    setShowLoader(false)
    setPageCount(Math.ceil(jobData.totaldocument / perPage))

    const loginUser = localStorage.getItem('current-user')
    const { appliedjobsid } = JSON.parse(loginUser)

    setAppliedJobs(appliedjobsid)

    // setjob(jobData.job.slice(offset, offset + perPage));
  }

  useEffect(() => {
    // if(props.jobId){
    fetchData(currentId)
    // }
  }, [offset, currentId])

  useEffect(() => {
    if (currentId) {
      fetchData(currentId)
    }
  }, [])

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    if (selectedPage === 0) {
      setOffset(1)
    } else {
      setOffset(selectedPage + 1)
    }

    // if(selectedPage===0){
    //   const newOffset =selectedPage;
    //   setOffset(newOffset)
    // }else{
    //   const newOffset =selectedPage + 1;
    //   setOffset(newOffset)
    // }
  }

  const showSingleJob = (id) => {
    props.getJobIdOnClick(id)
  }

  return (
    <Container>
      <div className="container">
        <div className="sub_container">
          <div className="sub_box">
            <Row xs={1} md={2} className="g-4 pt-4">
              {job &&
                job.length > 0 &&
                job.map((item) => {
                  return (
                    <Col>
                      <Card className="card_box" onClick={() => showSingleJob(item._id)}>
                        <Link to={'/job-index/' + item._id} state={{ job_id: item._id }}>
                          <div className="container mt-4">
                            <div className="row align-self-center">
                              <div className="col-md-2">
                                <img
                                  src={`${process.env.REACT_APP_DOMAIN_URL}${item.url}`}
                                  alt="logo"
                                  className="logo_img m-none"
                                  onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = JobImage
                                  }}
                                />
                                <h3 className="post-title text-capitalize m-only">
                                  <img
                                    src={`${process.env.REACT_APP_DOMAIN_URL}${item.url}`}
                                    alt="logo"
                                    className="logo_img mr-3"
                                    onError={(e) => {
                                      e.target.onerror = null
                                      e.target.src = JobImage
                                    }}
                                  />
                                  {item.jobtitle}
                                </h3>
                              </div>
                              <div className="col-md-10 relative">
                                <h3 className="post-title text-capitalize m-none">{item.jobtitle}</h3>

                                <ul className="icon-list ">
                                  <li>
                                    <MdOutlineWorkOutline /> <span className="text-capitalize">{item.companyname}</span>
                                  </li>
                                  <li>
                                    <GoLocation /> <span className="text-capitalize">{item.joblocation}</span>
                                  </li>
                                </ul>

                                <div className="button_box">
                                  <ul className="badages list-inline">
                                    {item.jobtype?.map((type) => {
                                      return <li className="list-inline-item text-capitalize">{type}</li>
                                    })}
                                  </ul>
                                </div>
                                {appiedJobs &&
                                  appiedJobs.map((id) => {
                                    if (id === item._id) {
                                      return (
                                        <div class="applied">
                                          <h4>
                                            <span>
                                              <MdDone />
                                            </span>
                                            Applied
                                          </h4>
                                        </div>
                                      )
                                    }
                                  })}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Card>
                    </Col>
                  )
                })}
            </Row>
          </div>
          <div className="pagination">
            {console.log('offect', offset)}
            <ReactPaginate
              previousLabel={'prev'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
              className="pagination text"
            />
          </div>
        </div>
      </div>
      <div className="recent-loader">
        <div className="load">{showLoader && <Loader />}</div>
      </div>
    </Container>
  )
}
