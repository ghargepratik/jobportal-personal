import React from 'react'
import Navbar from './navbar/Navbar.js'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Footer from './footer/Footer.js'
import ContactUsForm from '../contactUs/ContactUsForm.js'
const UserHome = () => {
  const location = useLocation()
  const serverPath = process.env.REACT_APP_URL
  const path = location.pathname.split('/')
  console.log('🚀 ~ file: UserHome.js ~ line 10 ~ UserHome ~ path', path)

  const route = path[1]

  return (
    <div>
      <div className="main-box">
        <div className="nav-container">
          <Navbar />
        </div>

        <div className="banner">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 p-0">
                <div className={route == 'job-index' ? 'banner_wrapper' : 'banner_wrapper job_image'}>
                  <div className="banner-content">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default UserHome
