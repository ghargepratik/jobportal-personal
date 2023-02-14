// import React, { useContext, useState, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { GlobalContext } from '../../../App'

// const Navbar = () => {
//   const navigate = useNavigate()
//   const [pageURL, setPageURL] = useState(0)
//   useEffect(() => {
//     setPageURL(window.location.href.split('/')[window.location.href.split('/').length - 1])
//   })
//   console.log(pageURL)
//   const {
//     state: { loginRole },
//     dispatch,
//   } = useContext(GlobalContext)
//   const token = localStorage.getItem('token') === 'null' ? null : localStorage.getItem('token')
//   const status = localStorage.getItem('status') === 'null' ? null : localStorage.getItem('status')

//   const logout = () => {
//     localStorage.setItem('current-user', 'null')
//     localStorage.setItem('token', 'null')
//     localStorage.setItem('status', 'null')
//     dispatch({ type: 'status', payload: { loginRole: 'null' } })
//   }
//   return (
//     <div>
//       <section className="bg-dark">
//         <div className="container p-0">
//           <div className="row p-2 nav-box">
//             <nav className="navbar navbar-expand-lg bg-dark sticky-top mb-0 align-items-baseline">
//               <button
//                 className="navbar-toggler"
//                 type="button"
//                 data-toggle="collapse"
//                 data-target="#navbarTogglerDemo01"
//                 aria-controls="navbarTogglerDemo01"
//                 aria-expanded="false"
//                 aria-label="Toggle navigation"
//               >
//                 <span className="navbar-toggler-icon"></span>
//               </button>
//               <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//                 <img src="https://techinfini.in//wp-content/uploads/2017/09/logo-2-5.png" alt="" style={{ width: '100px', heigth: '100px' }} />
//                 <ul className="navbar-nav mr-auto mt-2 mt-lg-0 align-items-baseline">
//                   <li className="nav-item active text-white font-weight-bold">
//                     <Link to="job-list" className={pageURL === 'job-list' && 'nav-link'}>
//                       Jobs
//                     </Link>
//                   </li>
//                   {status === null ? (
//                     <>
//                       <li className="nav-item text-white font-weight-bold">
//                         <Link to="register" className={pageURL === 'register' && 'nav-link'}>
//                           Register
//                         </Link>
//                       </li>
//                       <li className="nav-item text-white font-weight-bold">
//                         <Link to="login" className={pageURL === 'login' && 'nav-link'}>
//                           Login
//                         </Link>
//                       </li>
//                     </>
//                   ) : (
//                     <li className="nav-item text-white font-weight-bold">
//                       <Link className="" to="/job-list" onClick={logout}>
//                         Logout
//                       </Link>
//                     </li>
//                   )}
//                 </ul>
//               </div>
//             </nav>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Navbar

import React, { useContext, useState, useEffect, useLocation } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../../../App'
import SubHeader from './subheader/SubHeader'
import '../navbar/navbar.css'
import { SiSkypeforbusiness, SiYoutube } from 'react-icons/si'
import { ImFacebook, ImGooglePlus, ImTwitter, ImLinkedin2 } from 'react-icons/im'
import { MdCall, MdOutlineMailOutline } from 'react-icons/md'

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  console.log('toggleMenu', toggleMenu)

  const navigate = useNavigate()
  const [pageURL, setPageURL] = useState(0)
  useEffect(() => {
    setPageURL(window.location.href.split('/')[window.location.href.split('/').length - 1])
  })
  console.log('Navbar pageurl>.', pageURL)
  const {
    state: { loginRole },
    dispatch,
  } = useContext(GlobalContext)
  const token = localStorage.getItem('token') === 'null' ? null : localStorage.getItem('token')
  const status = localStorage.getItem('status') === 'null' ? null : localStorage.getItem('status')

  const logout = () => {
    localStorage.setItem('current-user', 'null')
    localStorage.setItem('token', 'null')
    localStorage.setItem('status', 'null')
    dispatch({ type: 'status', payload: { loginRole: 'null' } })
  }
  return (
    <div>
      <section id="header">
        <div className="slider">
          <div className="page-top"></div>
        </div>
        <div className="contact-and-menu">
          <div className="container">
            <div className="contact-bar">
              <div className="contact-details">
                <ul>
                  <li className="slogan">We transform ideas into reality!!!</li>
                  <li className="phone">
                    <span>
                      <MdCall />
                    </span>
                    <a href="#">+91-9302974394</a>
                  </li>
                  <li className="mail">
                    <span>
                      <MdOutlineMailOutline />
                    </span>
                    <a href="mailto:info@techinfini.com">info@techinfini.com</a>
                  </li>
                </ul>
              </div>
              <div className="social-icon">
                <ul>
                  <li>
                    <a href="skype:hariom.raghuwanshi?chat">
                      <SiSkypeforbusiness />
                    </a>
                  </li>
                  <li>
                    <a href="https://facebook.com/TechInfini">
                      <ImFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="https://plus.google.com/+TechInfiniSolutionsPvtLtdIndore">
                      <ImGooglePlus />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/TechInfini">
                      <ImTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="https://youtube.com/user/TechInfini">
                      <SiYoutube />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/techinfini-solutions-pvt.-ltd.">
                      <ImLinkedin2 />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="nav-bar">
              <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light header-navigation stricky original">
                  <div className="container-fluid">
                    <a className="navbar-brand" href="http://techinfini.myappsworld.online/index.html">
                      <img src="http://techinfini.myappsworld.online/img/logo-2-5.png" alt="logo" />
                    </a>
                    <buttton
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNavDropdown"
                      aria-controls="navbarNavDropdown"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                      onClick={() => setToggleMenu((pre) => !pre)}
                    >
                      <span className="navbar-toggler-icon"></span>
                    </buttton>
                    <div
                      className={!toggleMenu ? `collapse navbar-collapse justify-content-end` : `navbar-collapse justify-content-end`}
                      id="navbarNavDropdown"
                    >
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <a href="http://techinfini.myappsworld.online/index.html" className="nav-link active">
                            Home
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="http://techinfini.myappsworld.online/about.html" className="nav-link">
                            About
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="http://techinfini.myappsworld.online/services.html" className="nav-link">
                            Services
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="http://techinfini.myappsworld.online/products.html" className="nav-link">
                            Products
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="http://techinfini.myappsworld.online/portfolio.html" className="nav-link">
                            Portfolio
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="http://techinfini.myappsworld.online/career.html" className="nav-link">
                            Career
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="http://techinfini.myappsworld.online/blog.html" className="nav-link">
                            Blog
                          </a>
                        </li>
                        <li className="nav-item">
                          {/* <a href="http://techinfini.myappsworld.online/contact.html" className="nav-link">
                            contact
                          </a>
  */}
                          <Link to="/contactus" className="nav-link">
                            Contact Us
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
      <section id="header">
        <div className="action-bar">
          <div className="container">
            <div className="coloum one">
              <ul className="contact_details">
                <li className="slogan">We transform ideas into reality!!!</li>
                <li className="phone">
                  <span>
                    <MdCall className="icon-phone" />
                  </span>
                  <a href="tel:+91-9302974394">+91-9302974394</a>
                </li>
                <li className="mail">
                  <span>
                    <MdOutlineMailOutline className="icon-mail-line" />
                  </span>
                  <a href="mailto:info@techinfini.com">info@techinfini.com</a>
                </li>
              </ul>

              <ul className="social">
                <li className="skype">
                  <a target="_blank" href="skype:hariom.raghuwanshi?chat" title="Skype">
                    <SiSkypeforbusiness className="icon-skype" />
                  </a>
                </li>
                <li className="facebook">
                  <a target="_blank" href="https://facebook.com/TechInfini" title="Facebook">
                    <ImFacebook className="icon-facebook" />
                  </a>
                </li>
                <li class="googleplus">
                  <a target="_blank" href="https://plus.google.com/+TechInfiniSolutionsPvtLtdIndore" title="Google+">
                    <ImGooglePlus className="icon-gplus" />
                  </a>
                </li>
                <li className="twitter">
                  <a target="_blank" href="https://twitter.com/TechInfini" title="Twitter">
                    <ImTwitter className="icon-twitter" />
                  </a>
                </li>
                <li className="youtube">
                  <a target="_blank" href="https://youtube.com/user/TechInfini" title="YouTube">
                    <SiYoutube className="icon-play" />
                  </a>
                </li>
                <li className="linkedin">
                  <a target="_blank" href="https://www.linkedin.com/company/techinfini-solutions-pvt.-ltd." title="LinkedIn">
                    <ImLinkedin2 className="icon-linkedin" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div id="Top_bar">
          <div className="container">
            <div className="column one">
              <div className="top_bar_left clearfix">
                <div className="logo">
                  <a id="logo" href="https://techinfini.in" title="TechInfini Solutions Pvt. Ltd.">
                    <img
                      className="logo-main scale-with-grid"
                      src="https://techinfini.in//wp-content/uploads/2017/09/logo-2-5.png"
                      alt="TechInfini Solutions Pvt. Ltd."
                    />
                    <img className="logo-sticky scale-with-grid" src="https://techinfini.in//wp-content/uploads/2017/09/logo-2-5.png" alt="" />
                    <img
                      className="logo-mobile scale-with-grid"
                      src="https://techinfini.in/wp-content/uploads/2021/02/techinfini-logo-1.png"
                      alt=""
                    />
                  </a>
                </div>

                <div className="menu_wrapper">
                  <nav id="menu" className="menu-main-menu-container">
                    <ul id="menu-main-menu" className="menu">
                      <li id="menu-item-109" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home">
                        <a href="https://techinfini.in/">
                          <span>Home</span>
                        </a>
                      </li>
                      <li id="menu-item-448" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children submenu">
                        <a href="https://techinfini.in/about-us/">
                          <span>About</span>
                        </a>
                        <ul class="sub-menu" style={{ display: 'none' }}>
                          <li id="menu-item-155" className="menu-item menu-item-type-post_type menu-item-object-page">
                            <a href="https://techinfini.in/about-us/">
                              <span>About Us</span>
                            </a>
                          </li>
                          <li id="menu-item-112" className="menu-item menu-item-type-post_type menu-item-object-page">
                            <a href="https://techinfini.in/our-team/">
                              <span>Our Team</span>
                            </a>
                          </li>
                          <li id="menu-item-159" className="menu-item menu-item-type-post_type menu-item-object-page">
                            <a href="https://techinfini.in/vision-and-mission/">
                              <span>Vision and Mission</span>
                            </a>
                          </li>
                          <li id="menu-item-156" className="menu-item menu-item-type-post_type menu-item-object-page">
                            <a href="https://techinfini.in/core-values/">
                              <span>Core Values</span>
                            </a>
                          </li>
                          <li id="menu-item-157" className="menu-item menu-item-type-post_type menu-item-object-page">
                            <a href="https://techinfini.in/customer-speak/">
                              <span>Clients Testimonials</span>
                            </a>
                          </li>
                          <li id="menu-item-158" className="menu-item menu-item-type-post_type menu-item-object-page last-item">
                            <a href="https://techinfini.in/process-excellence/">
                              <span>Process Excellence</span>
                            </a>
                          </li>
                        </ul>
                        <span className="menu-toggle"></span>
                      </li>
                      <li
                        id="menu-item-344"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children submenu mfn-megamenu-parent"
                      >
                        <a href="https://techinfini.in/services/">
                          <span>Services</span>
                        </a>
                        <ul className="sub-menu mfn-megamenu mfn-megamenu-5" style={{ width: '931px', display: 'none' }}>
                          <li
                            id="menu-item-166"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children mfn-megamenu-cols-5 submenu"
                          >
                            <a className="mfn-megamenu-title" href="https://techinfini.in/open-source-development/">
                              <span>Open Source</span>
                              <i className="menu-arrow icon-right-open"></i>
                            </a>
                            <ul className="sub-menu mfn-megamenu mfn-megamenu-5">
                              <li id="menu-item-168" className="menu-item menu-item-type-post_type menu-item-object-page">
                                <a href="https://techinfini.in/wordpress-development/">
                                  <span>WordPress Development</span>
                                </a>
                              </li>
                              <li id="menu-item-167" className="menu-item menu-item-type-post_type menu-item-object-page">
                                <a href="https://techinfini.in/drupal-development/">
                                  <span>Drupal Development</span>
                                </a>
                              </li>
                              <li id="menu-item-169" className="menu-item menu-item-type-post_type menu-item-object-page">
                                <a href="https://techinfini.in/joomla-development/">
                                  <span>Joomla Development</span>
                                </a>
                              </li>
                              <li id="menu-item-172" className="menu-item menu-item-type-post_type menu-item-object-page">
                                <a href="https://techinfini.in/product-development/">
                                  <span>Product Development</span>
                                </a>
                              </li>
                              <li id="menu-item-612" className="menu-item menu-item-type-post_type menu-item-object-page last-item">
                                <a href="https://techinfini.in/shopify-development/">
                                  <span>Shopify Development</span>
                                </a>
                              </li>
                            </ul>
                            <span className="menu-toggle"></span>
                          </li>
                          <li
                            id="menu-item-165"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children mfn-megamenu-cols-5 submenu"
                          >
                            <a className="mfn-megamenu-title" href="https://techinfini.in/net-development/">
                              <span>.NET Development</span>
                              <i class="menu-arrow icon-right-open"></i>
                            </a>
                            <ul className="sub-menu mfn-megamenu mfn-megamenu-5">
                              <li id="menu-item-170" class="menu-item menu-item-type-post_type menu-item-object-page">
                                <a href="https://techinfini.in/c-net-development/">
                                  <span>C#.NET Development</span>
                                </a>
                              </li>
                              <li id="menu-item-171" className="menu-item menu-item-type-post_type menu-item-object-page">
                                <a href="https://techinfini.in/asp-net-development/">
                                  <span>ASP.NET Development</span>
                                </a>
                              </li>
                              <li id="menu-item-777" className="menu-item menu-item-type-post_type menu-item-object-page last-item">
                                <a href="https://techinfini.in/sitefinity-cms-development/">
                                  <span>Sitefinity Development</span>
                                </a>
                              </li>
                            </ul>
                            <span className="menu-toggle"></span>
                          </li>
                          <li
                            id="menu-item-173"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children mfn-megamenu-cols-5 submenu"
                          >
                            <a className="mfn-megamenu-title" href="https://techinfini.in/mobile-application-development/">
                              <span>Mobile Development</span>
                              <i class="menu-arrow icon-right-open"></i>
                            </a>
                            <ul className="sub-menu mfn-megamenu mfn-megamenu-5">
                              <li id="menu-item-360" class="menu-item menu-item-type-post_type menu-item-object-page">
                                <a href="https://techinfini.in/ios-development/">
                                  <span>IOS Development</span>
                                </a>
                              </li>
                              <li id="menu-item-359" className="menu-item menu-item-type-post_type menu-item-object-page last-item">
                                <a href="https://techinfini.in/andriod-development/">
                                  <span>Andriod Development</span>
                                </a>
                              </li>
                            </ul>
                            <span className="menu-toggle"></span>
                          </li>
                          <li
                            id="menu-item-354"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children mfn-megamenu-cols-5 submenu"
                          >
                            <a class="mfn-megamenu-title" href="https://techinfini.in/digital-marketing/">
                              <span>DIGITAL MARKETING</span>
                              <i className="menu-arrow icon-right-open"></i>
                            </a>
                            <ul class="sub-menu mfn-megamenu mfn-megamenu-5">
                              <li id="menu-item-176" className="menu-item menu-item-type-post_type menu-item-object-page">
                                <a href="https://techinfini.in/keyword-research/">
                                  <span>Keyword Research</span>
                                </a>
                              </li>
                              <li id="menu-item-180" className="menu-item menu-item-type-post_type menu-item-object-page">
                                <a href="https://techinfini.in/social-media-optimization/">
                                  <span>Social Media Optimization</span>
                                </a>
                              </li>
                              <li id="menu-item-177" className="menu-item menu-item-type-post_type menu-item-object-page last-item">
                                <a href="https://techinfini.in/link-building/">
                                  <span>Link Building</span>
                                </a>
                              </li>
                            </ul>
                            <span className="menu-toggle"></span>
                          </li>
                          <li
                            id="menu-item-348"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children mfn-megamenu-cols-5 submenu last-item"
                          >
                            <a className="mfn-megamenu-title" href="https://techinfini.in/branding/">
                              <span>Branding</span>
                              <i className="menu-arrow icon-right-open"></i>
                            </a>
                            <ul className="sub-menu mfn-megamenu mfn-megamenu-5">
                              <li id="menu-item-178" className="menu-item menu-item-type-post_type menu-item-object-page">
                                <a href="https://techinfini.in/market-research/">
                                  <span>Market Research</span>
                                </a>
                              </li>
                              <li id="menu-item-174" className="menu-item menu-item-type-post_type menu-item-object-page">
                                <a href="https://techinfini.in/content-writing/">
                                  <span>Content Writing</span>
                                </a>
                              </li>
                              <li id="menu-item-179" className="menu-item menu-item-type-post_type menu-item-object-page">
                                <a href="https://techinfini.in/ppc-management/">
                                  <span>PPC Management</span>
                                </a>
                              </li>
                              <li id="menu-item-181" className="menu-item menu-item-type-post_type menu-item-object-page">
                                <a href="https://techinfini.in/web-promotion/">
                                  <span>Web Promotion</span>
                                </a>
                              </li>
                              <li id="menu-item-175" className="menu-item menu-item-type-post_type menu-item-object-page last-item">
                                <a href="https://techinfini.in/email-marketing/">
                                  <span>Email Marketing</span>
                                </a>
                              </li>
                            </ul>
                            <span className="menu-toggle"></span>
                          </li>
                        </ul>
                        <span className="menu-toggle"></span>
                      </li>
                      <li id="menu-item-349" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children submenu">
                        <a href="https://techinfini.in/products/">
                          <span>Products</span>
                        </a>
                        <ul className="sub-menu" style={{ display: 'none' }}>
                          <li id="menu-item-161" className="menu-item menu-item-type-post_type menu-item-object-page">
                            <a href="https://techinfini.in/sketch-themes/">
                              <span>Sketch Themes</span>
                            </a>
                          </li>
                          <li id="menu-item-160" className="menu-item menu-item-type-post_type menu-item-object-page last-item">
                            <a href="https://techinfini.in/test-you/">
                              <span>Test You</span>
                            </a>
                          </li>
                        </ul>
                        <span className="menu-toggle"></span>
                      </li>
                      <li id="menu-item-350" className="menu-item menu-item-type-post_type menu-item-object-page">
                        <a href="https://techinfini.in/portfolio/">
                          <span>Portfolio</span>
                        </a>
                      </li>
                      <li id="menu-item-644" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children submenu">
                        <a href="https://techinfini.in/openings/">
                          <span>Career</span>
                        </a>
                        <ul class="sub-menu" style={{ display: 'none' }}>
                          <li id="menu-item-188" className="menu-item menu-item-type-post_type menu-item-object-page">
                            <a href="https://techinfini.in/why-techinfini/">
                              <span>Why TechInfini</span>
                            </a>
                          </li>
                          <li id="menu-item-189" className="menu-item menu-item-type-post_type menu-item-object-page">
                            <a href="https://techinfini.in/lifetechinfini/">
                              <span>Life @ TechInfini</span>
                            </a>
                          </li>
                          <li id="menu-item-681" className="menu-item menu-item-type-post_type menu-item-object-page">
                            <a href="https://techinfini.in/openings/">
                              <span>Jobs @ TechInfini</span>
                            </a>
                          </li>
                          <li id="menu-item-191" className="menu-item menu-item-type-post_type menu-item-object-page last-item">
                            <a href="https://techinfini.in/join-us/">
                              <span>Join Us</span>
                            </a>
                          </li>
                        </ul>
                        <span className="menu-toggle"></span>
                      </li>
                      <li id="menu-item-343" className="menu-item menu-item-type-post_type menu-item-object-page">
                        <a href="https://techinfini.in/blog/">
                          <span>Blog</span>
                        </a>
                      </li>
                      <li id="menu-item-111" className="menu-item menu-item-type-post_type menu-item-object-page">
                        <a href="https://techinfini.in/contact/">
                          <span>Contact</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div className="top_bar_right">
                  <div className="top_bar_right_wrapper">
                    <a href="https://techinfini.in//get-a-quote/" className="button button_theme button_js action_button " target="_blank">
                      <span className="button_label">Get Free Estimation</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

*/}
      <section id="Subheader">
        <SubHeader pageURL={pageURL} />
      </section>
    </div>
  )
}

export default Navbar
