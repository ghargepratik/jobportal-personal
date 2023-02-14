import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToggleJobStatus = (props) => {
  const [currentValue, setCurrentValue] = React.useState(props.initialStatusValue)

  const toggleHandler = () => {
    const status = !currentValue
    setCurrentValue(status)
    updateJobStatus(props.getAdminSingleJobid, status)
    console.log('togglr change')
  }

  const updateJobStatus = (id, status) => {
    try {
      let body = { jobstatus: status }
      const token = localStorage.getItem('token')
      let config = {
        headers: {
          headers: { 'Content-Type': 'multipart/form-data' },
          token: `Bearer${token}`,
        },
      }
      axios
        .put(`${process.env.REACT_APP_DOMAIN_URL}/api/jobs/admin-job-status-update/${id}`, body, config)
        .then((response) => {
          toast.success(response?.data?.message)
          console.log('update success', response.data)
        })
        .catch((err) => {
          toast.error(err.response?.data?.message)
        })
    } catch (err) {
      console.log('axios err', err)
    }
  }

  return (
    <div>
      <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
        <input
          type="checkbox"
          className="custom-control-input"
          id={props.getAdminSingleJobid}
          name={props.getAdminSingleJobid}
          checked={currentValue}
          onChange={toggleHandler}
        />
        <label className="custom-control-label" for={props.getAdminSingleJobid}>
          {currentValue ? 'Active' : 'Inactive'}
        </label>
      </div>
    </div>
  )
}

export default ToggleJobStatus
