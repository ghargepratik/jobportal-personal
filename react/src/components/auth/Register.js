import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'

const Register = () => {
  const [inputValue, setInputValue] = useState({
    username: '',
    status: '',
    email: '',
    phonenumber: '',
    password: '',
    cpassword: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()
  const inputHandler = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }
  const validationHandler = (e) => {
    console.log('inputValue', inputValue)
    e.preventDefault()
    const EmailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const MobileRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    const PasswordRegex = /^(\S)(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{6,16}$/

    if (
      inputValue.status.trim() === '' ||
      inputValue.username.trim() === '' ||
      inputValue.email.trim() === '' ||
      inputValue.phonenumber.trim() === '' ||
      inputValue.password.trim() === '' ||
      inputValue.cpassword.trim() === ''
    ) {
      setShowError(true)
      setErrorMessage('Please Fill All Fields')
    } else if (EmailRegex.test(inputValue.email) === false) {
      setShowError(true)
      setErrorMessage('Email is not valid')
    } else if (MobileRegex.test(inputValue.phonenumber) === false) {
      setShowError(true)
      setErrorMessage('Phone Number is not valid')
    } else if (PasswordRegex.test(inputValue.password) === false) {
      setShowError(true)
      setErrorMessage('Password should grater than 6 char and less than 16 and contain one number & Special Charecter')
    } else if (inputValue.password !== inputValue.cpassword) {
      setShowError(true)
      setErrorMessage('Repeat Password Not Matched with Password')
    } else {

      console.log("register email>>>>>>>>>>,",/[^A-Z]/g.test(inputValue.email))
      setShowError(false)
      submitHandler(e)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const body={
      username :inputValue.username,
      status : inputValue.status,
      email:inputValue.email.toLowerCase(),
      phonenumber:inputValue.phonenumber,
      password :inputValue.password,
      cpassword :inputValue.cpassword,
    }

    try {
      axios
        .post(`${process.env.REACT_APP_DOMAIN_URL}/api/admin/register`, body)
        .then((response) => {
          console.log('register res', response.data)
          toast.success(response.data.message)
          localStorage.setItem('token', `Bearer ${response.data.token}`)
          localStorage.setItem('status', response.data.user.status)
          localStorage.setItem('current-user', JSON.stringify(response.data.user))
          const { status } = response.data.user
          setTimeout(function () {
            status === 'admin' ? navigate('/login') : navigate('/login')
          }, 1000)
        })
        .catch((err) => {
          setShowError(true)
          setErrorMessage(err.response.data.error)
        })
    } catch (err) {}
  }
  return (
    <div class="hold-transition register-page">
      <div class="register-box">
        <div class="register-logo">
          <img src="https://techinfini.in//wp-content/uploads/2017/09/logo-2-5.png" style={{ width: '170px', heigth: '60px' }} alt="Logo" />
        </div>

        <div class="card">
          <div class="card-body register-card-body">
            <p class="login-box-msg">Register a new membership</p>
            {showError && (
              <h6 className="text-center text-danger pt-4">
                <span>{errorMessage}</span>
              </h6>
            )}
            <form>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="username"
                  autocomplete="on"
                  name="username"
                  value={inputValue.username}
                  onChange={inputHandler}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  name="email"
                  autocomplete="on"
                  value={inputValue.email}
                  onChange={inputHandler}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Phone"
                  name="phonenumber"
                  autocomplete="on"
                  value={inputValue.name}
                  onChange={inputHandler}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-user"></span>
                  </div>
                </div>
              </div>

              <div class="input-group mb-3">
                <select class="form-control" name="status" onChange={inputHandler}>
                  <option value="">Selcte Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>

                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-user"></span>
                  </div>
                </div>
              </div>

              <div class="input-group mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  name="password"
                  autocomplete="on"
                  value={inputValue.password}
                  onChange={inputHandler}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Retype password"
                  name="cpassword"
                  autocomplete="on"
                  value={inputValue.cpassword}
                  onChange={inputHandler}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6 offset-3">
                  <div class="text-center">
                    <button type="button" class="btn btn-primary btn-block" onClick={validationHandler}>
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <br />
            <Link to="/login" class="text-center">
              I already have a membership
            </Link>
            <br />
            <Link to="/job-list" className="text-center">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
