import React from 'react'
import { IoMdMail } from 'react-icons/io'
import { MdCall } from 'react-icons/md'
import { ImSkype } from 'react-icons/im'

const ContactUsMap = () => {
  return (
    <div>
      <div
        className="map"
        dangerouslySetInnerHTML={{
          __html: `<iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.5456963989022!2d75.89003831480312!3d22.745121285094225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcfd2ac6c2f3%3A0x84bcc6d5601300ef!2sTechInfini!5e0!3m2!1sen!2sin!4v1673951541897!5m2!1sen!2sin"
                width="100%"
                height="450"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>`,
        }}
      ></div>

      <div className="social-contact container">
        <div className="section_wrapper row">
          <div className="items_group">
            <div className="column one-fourth column_fancy_heading">
              <div className="fancy_heading fancy_heading_icon">
                <h2 className="title">
                  <span style={{ fontWeight: 400 }}>Have Any Questions?</span>
                </h2>
              </div>
            </div>

            <div className="column one-fourth column_list">
              <div className="list_item lists_2 clearfix">
                <div className="list_left list_icon">
                  <MdCall className="icon-call" />
                </div>
                <div className="list_right">
                  <div className="desc">
                    <big className="social-item-content">Call us</big>
                    <h4>
                      <a href="tel:+919302974394">+91 9302974394</a>
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="column one-fourth column_list">
              <div className="list_item lists_2 clearfix">
                <div className="list_left list_icon">
                  <ImSkype className="icon-skype" />
                </div>
                <div className="list_right">
                  <div className="desc">
                    <big className="skype">Skype</big>
                    <h4>
                      <a href="https://techinfini.in/contact/skype:hariom.raghuwanshi?chat" title="Skype">
                        hariom.raghuwanshi
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="column one-fourth column_list">
              <div className="list_item lists_2 clearfix">
                <div className="list_left list_icon">
                  <IoMdMail />
                </div>
                <div className="list_right">
                  <div className="desc">
                    <big className="mail">E-mail</big>
                    <h4>
                      <a href="mailto:info@techinfini.com" title="Have any questions?">
                        info@techinfini.com
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUsMap
