import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../App'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import ForgotPassword from './ForgotPassword'

const Login = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const {
    state: { loginRole },
    dispatch,
  } = useContext(GlobalContext)

  useEffect(() => {
    if (loginRole === 'admin') {
      navigate('/admin/dashboard')
    } else if (loginRole === 'user') {
      navigate('/job-list')
    }
  }, [])

  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  })

  const inputHandler = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    let body={
      email:inputValue.email.toLowerCase(),
      password :inputValue.password
    }

    try {
      axios
        .post(`${process.env.REACT_APP_DOMAIN_URL}/api/admin/login`, body)
        .then((response) => {
          localStorage.setItem('token', `Bearer ${response.data.token}`)
          localStorage.setItem('status', response.data.existsAdmin.status)
          localStorage.setItem('current-user', JSON.stringify(response.data.existsAdmin))

          toast.success('Logged In Successfully')

          setTimeout(function () {
            const status = localStorage.getItem('status')
            dispatch({ type: 'status', payload: { loginRole: status } })
            status === 'admin' ? navigate('/admin/dashboard') : navigate('/job-list')
          }, 1000)
        })
        .catch((err) => {
          toast.error(err.response.data || 'Something Went Wrong')
          console.log('registation err', err.response)
        })
    } catch (err) {
      console.log('axios err', err)
    }
  }

//TO SHOW FORGOT PASSWORD MODEL
  const showForm = () => setShow(true)
  const closeForm = () => setShow(false)


  return (
    <div className="hold-transition login-page">
        <div className="login-box">
            <div className="login-logo">
              <img src="https://techinfini.in//wp-content/uploads/2017/09/logo-2-5.png" style={{ width: '170px', heigth: '60px' }} alt="Logo" />
            </div>

            <div className="card">
              <div className="card-body login-card-body">
                <p className="login-box-msg">Sign in to start your session</p>

                <form action="../../index3.html" method="post">
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={inputValue.email}
                      onChange={inputHandler}
                      required="true"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope"></span>
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={inputValue.password}
                      onChange={inputHandler}
                      required="true"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock"></span>
                      </div>
                    </div>
                  </div>
                  <div className="row text-center">
                    <div className="col-6 offset-2">
                      <button type="submit" className="btn btn-primary btn-block" onClick={submitHandler}>
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
                <br />

                <p className="mb-0">
                  <Link to="#" className="text-center" onClick={showForm}>
                    Forget Password
                  </Link>
                  <br />
                  <Link to="/register" className="text-center">
                    Register a new
                  </Link>
                  <br />
                  <Link to="/job-list" className="text-center">
                    Home
                  </Link>
                </p>
              </div>
            </div>
        </div>

        <div>{show && <ForgotPassword show={show}  closeForm={closeForm} />}</div>
    </div>
  )
}

export default Login
