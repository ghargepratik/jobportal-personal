import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineClockCircle, AiOutlineFile } from 'react-icons/ai'
import Loader from '../../utility/Loader.js'
import {convertDateFormate} from "../../common/convertDateFormate.js"

const AllComments = (props) => {
  console.log("ALL_COMMENT_RENDER")
  const [showLoader, setShowLoader] = useState(false)
  const [fetchComment, setFetchComment] = useState([])
  const GetsCommentsByID = () => {
    try {
      const token = localStorage.getItem('token')
      let config = {
        headers: {
          headers: { 'Content-Type': 'multipart/form-data' },
          token: `Bearer${token}`,
        },
      }
      setShowLoader(true)
      axios
        .get(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/applied-user-info/comment/${props.singleJobApplicationId}`, config)
        .then((response) => {
          console.log(response.data)
          setShowLoader(false)
          setFetchComment(response.data.cmts.reverse())
        })
        .catch((err) => {})
    } catch (err) {}
  }

  useEffect(() => {
    props.childFunc.GetsCommentsByID = GetsCommentsByID
    GetsCommentsByID()
  }, [props.UserInfoStatus])

  
  

  return (
    <>
      <h4 className="comm-head">Recents Comments</h4>
      {showLoader && <Loader />}
      <div className="admin-comment">
        {fetchComment.map((data) => {
          return (
            <div className="comments">
              <p dangerouslySetInnerHTML={{ __html: data.comment }}></p>
              <div className="comment">
                <ul className="list-unstyled list-inline">
                  <li className="list-inline-item">
                    <AiOutlineClockCircle />
                    {convertDateFormate(data.time)}
                  </li>
                </ul>
                <div className="comment-image">
                  <ul className="image-link">
                    {data.files.map((img, index) => {
                      return (
                        <li>
                          <a href={`${process.env.REACT_APP_DOMAIN_URL}/${img.url}`} target="_blank">
                            <AiOutlineFile /> {(index = index + 1)}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default AllComments
