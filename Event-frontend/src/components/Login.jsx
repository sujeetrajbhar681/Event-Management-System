import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {

  const [login, setLogin] = useState({ userName: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
      e.preventDefault()
      axios.post('http://localhost:8080/login', login)
          .then((res) => {
              localStorage.setItem('user', JSON.stringify(res.data))
              navigate('/')
              window.location.reload()
          })
          .catch((err) => setError('Invalid username or password'))
  }

  return (
    <div className='container'>
      <div className='row justify-content-center align-items-center g-2'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title'>Login</h4>

              { error && <div className='alert alert-danger'>{error}</div> }

              <form onSubmit={handleSubmit}>

                <div className='form-floating mb-3'>
                  <input type='text' className='form-control'
                    id='f1' placeholder=''
                    onChange={(e) => setLogin({...login, userName: e.target.value})} />
                  <label htmlFor='f1'>User Name</label>
                </div>

                <div className='form-floating mb-3'>
                  <input type='password' className='form-control'
                    id='f2' placeholder=''
                    onChange={(e) => setLogin({...login, password: e.target.value})} />
                  <label htmlFor='f2'>Password</label>
                </div>

                <button type='submit' className='btn btn-primary me-2'>Login</button>
                <NavLink className='btn btn-secondary' to='/register'>Register</NavLink>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
