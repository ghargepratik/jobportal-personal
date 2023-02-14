import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { GlobalContext } from '../../../App'

const Sidebar = () => {
  const [reportList, setReportList] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  const {
    state: { loginRole },
    dispatch,
  } = useContext(GlobalContext)

  const path = location.pathname.split('/')[location.pathname.split('/').length - 1]

  const openReportSection = () => {
    setReportList(!reportList)
  }

  const logoutHandler = () => {
    localStorage.setItem('current-user', 'null')
    localStorage.setItem('token', 'null')
    localStorage.setItem('status', 'null')
    dispatch({ type: 'status', payload: { loginRole: 'null' } })
    // setTimeout(function () {
    navigate('/job-list')
    // }, 500);
  }

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="index3.html" className="brand-link">
        <img src="https://techinfini.in//wp-content/uploads/2017/09/logo-2-5.png" style={{ width: '220px', height: '56px' }} alt="Logo" />
      </a>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" id="sidebar_menu">
            <li className="nav-item ">
              <Link to="dashboard" className={path === 'dashboard' ? ' nav-link active' : 'nav-link'}>
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                  {/* <i className="right fas fa-angle-left"></i> */}
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="create-job-post" className={path === 'create-job-post' ? ' nav-link active' : 'nav-link'}>
                <i className="nav-icon fa fa-plus"></i>
                <p>Create Job Post</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="job-post-list" className={path === 'job-post-list' ? ' nav-link active' : 'nav-link'}>
                <i className="nav-icon fas fa-list"></i>
                <p>
                  Job Post List
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="user-applied-applications" className={path === 'user-applied-applications' ? ' nav-link active' : 'nav-link'}>
                <i className="nav-icon fas fa-list"></i>
                <p>User Applied Application</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="email-templates" className={path === 'email-templates' ? ' nav-link active' : 'nav-link'}>
                <i className="fas fa-envelope nav-icon"></i>
                <p>Email Templates</p>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={openReportSection}>
                <i className="nav-icon 	fa fa-server text-white"></i>
                <p className="text-white">
                  Report List
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview" style={{ display: reportList ? 'none' : 'block' }}>
                <li className="nav-item">
                  <Link to="interview-scheduled-list" className={path === 'interview-scheduled-list' ? ' nav-link active' : 'nav-link'}>
                    <i className="	fa fa-minus nav-icon"></i>
                    <p> Interview Scheduled</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="hired-candidates-list" className={path === 'hired-candidates-list' ? ' nav-link active' : 'nav-link'}>
                    <i className="fa fa-minus nav-icon"></i>
                    <p> Hired Candidates</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="joined-candidates-list" className={path === 'joined-candidates-list' ? ' nav-link active' : 'nav-link'}>
                    <i className="fa fa-minus nav-icon"></i>
                    <p>Joined Candidates</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="activity" className={path === 'activity' ? ' nav-link active' : 'nav-link'}>
                <i className="	fa fa-cog nav-icon"></i>
                <p>All Activities</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="address" className={path === 'address' ? ' nav-link active' : 'nav-link'}>
                <i className="	fa fa-cog nav-icon"></i>
                <p>Manage Address</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="generate-document" className={path === 'generate-document' ? ' nav-link active' : 'nav-link'}>
                <i className="	fa fa-cog nav-icon"></i>
                <p>Records Of Generate Document</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="send-emails" className={path === 'send-emails' ? ' nav-link active' : 'nav-link'}>
                <i className="	fa fa-cog nav-icon"></i>
                <p>Records Of Sent EMails</p>
              </Link>
            </li>
            <li className="nav-item">
              <a href="javascript:void(0)" className="nav-link" onClick={logoutHandler}>
                <i className="nav-icon 	fa fa-share-square"></i>
                <p>Logout</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
