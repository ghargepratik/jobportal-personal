import React from 'react'
import { MdOutlineKeyboardArrowRight, MdLocationPin, MdOutlineMailOutline } from 'react-icons/md'
import { ImMobile } from 'react-icons/im'
import { HiMail } from 'react-icons/hi'
import './footer.css'

const Footer = () => {
  return (
    <div>
      <section id="footer">
        <div className="footer-main container">
          <div className="row">
            <div className="col-sm-12 col-md-3 footer-col1">
              <h5>Company</h5>
              <ul>
                <li>
                  <span>
                    <MdOutlineKeyboardArrowRight className="fa fa-chevron-right" />
                  </span>
                  <a href="#">About</a>
                </li>
                <li>
                  <span>
                    <MdOutlineKeyboardArrowRight className="fa fa-chevron-right" />
                  </span>
                  <a href="#">Our Team</a>
                </li>
                <li>
                  <span>
                    <MdOutlineKeyboardArrowRight className="fa fa-chevron-right" />
                  </span>
                  <a href="#">Vision and Mission</a>
                </li>
                <li>
                  <span>
                    <MdOutlineKeyboardArrowRight className="fa fa-chevron-right" />
                  </span>
                  <a href="#">Core Values</a>
                </li>
                <li>
                  <span>
                    <MdOutlineKeyboardArrowRight className="fa fa-chevron-right" />
                  </span>
                  <a href="#">Clients Testimonials</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-12 col-md-3 footer-col2">
              <h5>Services</h5>
              <ul>
                <li>
                  <span>
                    <MdOutlineKeyboardArrowRight className="fa fa-chevron-right" />
                  </span>
                  <a href="#">Web Development</a>
                </li>
                <li>
                  <span>
                    <MdOutlineKeyboardArrowRight className="fa fa-chevron-right" />
                  </span>
                  <a href="#">Net Development</a>
                </li>
                <li>
                  <span>
                    <MdOutlineKeyboardArrowRight className="fa fa-chevron-right" />
                  </span>
                  <a href="#">Mobile Application </a>
                </li>
                <li>
                  <span>
                    <MdOutlineKeyboardArrowRight className="fa fa-chevron-right" />
                  </span>
                  <a href="#">Digital Marketing</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-12 col-md-3 footer-col3">
              <h5> Offical Partners</h5>
              <div>
                <div className="reviewed">
                  <strong>We are reviewed on Clutch</strong>
                </div>
                <div className="review-main">
                  <div>
                    <span className="review">REVIEWED ON</span>
                    <span className="footer-star">
                      <a href="#">
                        <img src="http://techinfini.myappsworld.online/img/16231558095-star-rating.svg" alt="5 star" />
                      </a>
                    </span>
                  </div>

                  <div>
                    <span>
                      <img
                        src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='87.861' height='25' xml:space='preserve'%3E%3Cpath fill='%23FFF' d='M22.861 0h4v25h-4zM40.861 17.025c0 3.826-3.217 4.131-4.174 4.131-2.391 0-2.826-2.238-2.826-3.588V8h-4v9.548c0 2.37.744 4.326 2.048 5.63 1.152 1.153 2.878 1.783 4.748 1.783 1.326 0 3.204-.413 4.204-1.326V25h4V8h-4v9.025zM52.861 2h-4v6h-3v4h3v13h4V12h3V8h-3zM68.458 19.917c-.871.783-2.021 1.217-3.283 1.217-2.782 0-4.825-2.043-4.825-4.848s1.978-4.762 4.825-4.762c1.24 0 2.412.413 3.305 1.196l.607.522 2.697-2.696-.675-.609C69.522 8.504 67.415 7.7 65.174 7.7c-5 0-8.631 3.608-8.631 8.565 0 4.936 3.718 8.673 8.631 8.673 2.283 0 4.412-.804 5.979-2.26l.652-.609-2.739-2.694-.608.542zM86.061 9.482C84.909 8.33 83.559 7.7 81.689 7.7c-1.326 0-2.828.413-3.828 1.325V0h-4v25h4v-9.365c0-3.826 2.718-4.13 3.675-4.13 2.391 0 2.325 2.239 2.325 3.587V25h4v-9.887c0-2.37-.495-4.326-1.8-5.631'/%3E%3Cpath fill='%23FF3D2E' d='M65.043 13.438a2.891 2.891 0 1 1 0 5.784 2.891 2.891 0 0 1 0-5.784'/%3E%3Cpath fill='%23FFF' d='M17.261 18.721c-1.521 1.565-3.587 2.413-5.761 2.413-4.456 0-7.696-3.5-7.696-8.304 0-4.826 3.24-8.326 7.696-8.326 2.153 0 4.196.847 5.74 2.391l.608.609 2.674-2.674-.587-.609C17.718 1.938 14.718.7 11.5.7 4.935.7 0 5.917 0 12.851 0 19.764 4.957 24.96 11.5 24.96c3.24 0 6.24-1.26 8.457-3.543l.587-.609-2.652-2.717-.631.63z'/%3E%3C/svg%3E"
                        alt="cluch img"
                      />
                    </span>
                    <span className="review-4">4 REVIEWS</span>
                  </div>
                </div>

                <div>
                  <div>
                    <div className="shopify-partner">
                      <strong>We are authorized shopify partner</strong>
                    </div>
                    <div className="shopify-partner-img">
                      <img src="http://techinfini.myappsworld.online/img/Techimg1 (2).jpg" alt="shopify-partner-img" />
                    </div>
                  </div>

                  <div>
                    <div className="site-developer">
                      <strong>We are certified Sitefinity Developer</strong>
                    </div>
                    <div className="site-developer-img">
                      <img src="http://techinfini.myappsworld.online/img/Techimg1%20(1).jpg" alt="site-developer-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-3 footer-col4">
              <h5> Let's Talk!</h5>
              <div>
                <ul>
                  <li>
                    <span>
                      <MdLocationPin className="fa fa-map-marker" />
                    </span>
                    <strong>Our address:</strong>
                    <p></p>
                    <p className="compnay-name">TechInfini Solutions Pvt. Ltd.</p>" 402, Airen Heights, Scheme No. 54, Opposite C21 Mall,Indore,
                    Madhya Pradesh 452010 "<p></p>
                  </li>
                  <li>
                    <span>
                      <HiMail />
                      <strong>Have any questions?</strong>
                    </span>
                    <p>info@techinfini.com</p>
                  </li>

                  <li>
                    <span>
                      <ImMobile />
                      <strong>Call us:</strong>
                    </span>
                    <p>+91-9302974394</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer
