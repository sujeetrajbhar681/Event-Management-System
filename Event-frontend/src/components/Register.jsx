import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

const Register = () => {

  const [user, setUser] = useState({ userName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
      e.preventDefault()
      axios.post('http://localhost:8080/register', user)
          .then((res) => navigate('/login'))
          .catch((err) => setError(
              err.response && err.response.status === 409 ? 'Username already taken' : 'Registration failed'))
  }

  return (
    <div className='container'>
      <div className='row justify-content-center align-items-center g-2'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title'>Register</h4>

              { error && <div className='alert alert-danger'>{error}</div> }

              <form onSubmit={handleSubmit}>

                <div className='form-floating mb-3'>
                  <input type='text' className='form-control'
                    id='f1' placeholder=''
                    onChange={(e) => setUser({...user, userName: e.target.value})} />
                  <label htmlFor='f1'>User Name</label>
                </div>

                <div className='form-floating mb-3'>
                  <input type='email' className='form-control'
                    id='f2' placeholder=''
                    onChange={(e) => setUser({...user, email: e.target.value})} />
                  <label htmlFor='f2'>Email</label>
                </div>

                <div className='form-floating mb-3'>
                  <input type='password' className='form-control'
                    id='f3' placeholder=''
                    onChange={(e) => setUser({...user, password: e.target.value})} />
                  <label htmlFor='f3'>Password</label>
                </div>

                <button type='submit' className='btn btn-primary me-2'>Register</button>
                <NavLink className='btn btn-secondary' to='/login'>Back to Login</NavLink>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
