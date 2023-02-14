// import "../../css/jobsinglepage.css";
import { useLocation, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ApplyNowJob from '../../common/ApplyNowJob.js'
import { GoCalendar } from 'react-icons/go'
import { GoLocation } from 'react-icons/go'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { CgFacebook } from 'react-icons/cg'
import { TiSocialTwitter } from 'react-icons/ti'
import { CgMail } from 'react-icons/cg'
import { ImLinkedin } from 'react-icons/im'
import axios from 'axios'
import JobList from './RecentJobList.js'
import 'react-toastify/dist/ReactToastify.css'
import { TwitterShareButton, FacebookShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, LinkedinShareButton } from 'next-share'
import JobImage from '../../../assets/images/job.png'
import { convertDateFormate } from '../../common/convertDateFormate.js'

const JobIndex = (props) => {
  const location = useLocation()
  const params = useParams()
  const [data, setData] = useState('')
  const [show, setShow] = useState(false)
  const [jobId, setJobId] = useState(0)
  const [appliedJob, setAppliedJob] = useState(false)

  const showForm = () => {
    setShow(true)
    // if (status === "admin") {
    //   toast.error("You are admin. Please login from user role");
    //   setTimeout(function () {
    //     navigate("/login");
    //   }, 1000);
    // } else if (status === "user") {
    //   setShow(true);
    // } else {
    //   toast.error("Please login first.");
    //   setTimeout(function () {
    //     navigate("/login");
    //   }, 1000);
    // }
  }

  const closeForm = () => setShow(false)

  const getDataFromId = (id) => {
    try {
      axios
        .get(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/get/${id}`)
        .then((response) => {
          setData(response.data)

          const loginUser = localStorage.getItem('current-user')
          const { appliedjobsid } = JSON.parse(loginUser)

          appliedjobsid?.map((appliedId) => {
            if (appliedId === id) {
              setAppliedJob(true)
            }
          })
        })
        .catch((err) => {
          console.log('create job catch err', err)
        })
    } catch (err) {
      console.log('catch err single job', err)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    const id = location?.state?.job_id || params.id
    setJobId(id)
    getDataFromId(id)
  }, [params.id])

  const getJobIdOnClick = (id) => {
    console.log(`getJobIdOnClick - ${id}`)
    getDataFromId(id)
  }

  return (
    <div className="container">
      {console.log('data', appliedJob, data, 'share url', `${process.env.REACT_APP_URL + 'job-index/' + jobId}`)}
      <div className="row">
        <div className="col-md-12">
          <div className="sub_box">
            <div className="head_box">
              <div className="logo_box">
                <img
                  src={`${process.env.REACT_APP_DOMAIN_URL}${data.url}`}
                  alt=""
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = JobImage
                  }}
                />
              </div>

              <div className="head_content_box">
                <h3 className="page-title text-capitalize m-center">{data.jobtitle}</h3>
                <div>
                  <ul className="link_ul list-unstyled">
                    <li>
                      <a href={data.facebook} target="_blank" className="fb" rel="noreferrer">
                        <CgFacebook /> <span>Facebook</span>
                      </a>
                    </li>
                    <li>
                      <a href={data.linkdin} target="_blank" className="link" rel="noreferrer">
                        <ImLinkedin />
                        <span>Linkdin</span>
                      </a>
                    </li>
                    <li>
                      <a href={data.twitter} target="_blank" className="tweet" rel="noreferrer">
                        <TiSocialTwitter />
                        <span>Twitter</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.gmail.com" target="_blank" className="email-icon" rel="noreferrer">
                        <CgMail />
                        <span>Email</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="apply_btn">
                <button disabled={appliedJob} type="button" className="btn btn-success" onClick={showForm}>
                  {appliedJob ? 'Applied' : 'Apply now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row pt-4">
        <div className="col-md-8">
          <div className="education">
            <h4 className="main_title">
              <span>Education </span>
            </h4>
            <p className="pt-3" dangerouslySetInnerHTML={{ __html: data.eduction }}></p>
          </div>
          <div className="experience">
            <h4 className="main_title">
              <span>Experience</span>
            </h4>
            <p className="pt-3" dangerouslySetInnerHTML={{ __html: data.experiencedetail }}></p>
          </div>
          <div className="knowledgeoff">
            <h4 className="main_title">
              <span>Knowledge Of</span>
            </h4>
            <p className="pt-3" dangerouslySetInnerHTML={{ __html: data.knowledgeof }}></p>
            <div className="social-btn">
              <FacebookShareButton
                url={`${process.env.REACT_APP_URL + '#/job-index/' + jobId}`}
                quote={'next-share is a social share buttons for your next React apps.'}
                // hashtag={'#nextshare'}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={`${process.env.REACT_APP_URL + '#/job-index/' + jobId}`}
                quote={'next-share is a social share buttons for your next React apps.'}
                // hashtag={'#nextshare'}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LinkedinShareButton
                url={`${process.env.REACT_APP_URL + '#/job-index/' + jobId}`}
                quote={'next-share is a social share buttons for your next React apps.'}
                // hashtag={'#nextshare'}
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
          </div>
        </div>

        <div className="col-md-4 job_overview">
          <div className="job_overview_heading">
            <h4 className=" main_title page-title">
              <span>Job Overview</span>
            </h4>
          </div>
          <div className="job_overview_details">
            <div className="overview_itemdiv">
              <div className="overview_logo">
                <MdOutlinePersonOutline />
              </div>
              <div className="overview_items">
                <h6>Job Title</h6>
                <p className="text-capitalize">{data.companyname}</p>
              </div>
            </div>
            <div className="overview_itemdiv">
              <div className="overview_logo">
                <GoCalendar />
              </div>
              <div className="overview_items">
                <h6>Date Posted:</h6>
                <p>{convertDateFormate(data.updatedAt)}</p>
              </div>
            </div>

            <div className="overview_itemdiv">
              <div className="overview_logo">
                <GoLocation />
              </div>
              <div className="overview_items">
                <h6>Location</h6>
                <p>{data.joblocation}</p>
              </div>
            </div>
          </div>
          <div className="job_location mt-4">
            <h4 className="page-title main_title">
              <span className="text-capitalize">Job Location</span>
            </h4>
            <div className="map">
              <div style={{ maxWidth: '100%', overflow: 'hidden', margin: '25px 0px' }} dangerouslySetInnerHTML={{ __html: data.embed_a_map }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="row pt-4">
        <div className="footer_title">
          <h4 className="page-title">Recent Jobs</h4>
        </div>
        <div className="footer_card pt-4">
          {/*  <RecentsJobs />  */}
          <JobList getJobIdOnClick={getJobIdOnClick} />
        </div>

        <div>{show && <ApplyNowJob show={show} jobid={data._id} jobposttitle={data.jobtitle} closeForm={closeForm} />}</div>
      </div>
    </div>
  )
}

export default JobIndex
