import React from 'react'
import '../navbar.css'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

const SubHeader = ({ pageURL }) => {
  let values = {
    '': 'Career Opportunities',
    contactus: 'Contact Us',
  }
  console.log('🚀 ~ file: SubHeader.js:10 ~ SubHeader ~ values', values[pageURL])
  return (
    <div>
      <div className="container">
        <div className="column one">
          <h1 className="title">{values[pageURL] || 'Career Opportunities'}</h1>
          <ul className="breadcrumbs has-link">
            <li>
              <a href="https://techinfini.in/">Home</a>
              <span>
                <MdOutlineKeyboardArrowRight className="icon-right-open" />
              </span>
            </li>
            <li>
              <a href="https://techinfini.in/openings/">{values[pageURL] || 'Career Opportunities'}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SubHeader
