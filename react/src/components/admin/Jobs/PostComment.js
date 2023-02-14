import React, { useState, useMemo } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import AllComments from './AllComments'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PostComment = (props) => {
  // console.log("POST_COMMENT_RENDER");
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [input, setInput] = useState("")
  const [fileValue, setFileValue] = useState([])
  const childFunc = React.useRef(null)
  const fileHandler = (e) => {
    setFileValue(e.target.files)
  }

  // console.log(`props in POSTcomment - ${props.singleJobApplicationId}`)
  // console.log(props.singleJobApplicationId)

  const submitHandler = (e) => {
   
    e.preventDefault()
    var isEmpty = true
    for (let keys in fileValue) {
      isEmpty = false
      break
    }

    if (!input && isEmpty) {
      setShowError(true)
      toast.error('Please Write Comment')
    } else {
      setShowError(false)
      const token = localStorage.getItem('token')
      let config = {
        headers: {
          headers: { 'Content-Type': 'multipart/form-data' },
          token: `Bearer${token}`,
        },
      }

      let formData = new FormData()
      formData.append('singlejobapplicationid', props.singleJobApplicationId)
      formData.append('comment', input)
      for (let i = 0; i < fileValue?.length; i++) {
        formData.append(`files`, fileValue[i])
      }

      try {
        axios
          .post(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/applied-user-info/comment`, formData, config)
          .then((response) => {
            childFunc.GetsCommentsByID(props.singleJobApplicationId)
            setInput('')
            setFileValue([])
          })
          .catch((err) => {
            console.log('catch err', err)
            toast.error(err.response?.data?.message)
          })
      } catch (err) {
        console.log('axios err', err)
      }
    }
  }

  const memoComponentCommentGet = useMemo(() => {
    // console.log(`POST ALL  comment CALL- ${props.singleJobApplicationId}`)
    return <AllComments singleJobApplicationId={props.singleJobApplicationId} childFunc={childFunc} UserInfoStatus={props.UserInfoStatus} />
  }, [props.UserInfoStatus])

  return (
    <div>
      <form className="pt-2 pb-4">
        <label for="w3review">
          {showError ? (
            <h6 className="text-center text-danger pt-4 error_message">
              <span>{`Error : ${errorMessage}`}</span>
            </h6>
          ) : (
            <>Comment</>
          )}
        </label>
        <textarea
          id="w3review"
          name="comment"
          rows="4"
          cols="50"
          className="mb-3 pt-2 pl-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <input type="file" id="myFile" name="files" onChange={(e) => fileHandler(e)} multiple />
        <Button variant="primary" onClick={(e) => submitHandler(e)}>
          comment
        </Button>
      </form>
      {memoComponentCommentGet}
    </div>
  )
}

export default PostComment
