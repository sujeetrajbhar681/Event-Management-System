import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const handleLogout = () => {
      localStorage.removeItem('user')
      navigate('/login')
      window.location.reload()
  }

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
      <div className='container'>

        <NavLink className='navbar-brand' to='/'>Event Management</NavLink>

        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav me-auto mt-2 mt-lg-0'>

            { user && (
              <li className='nav-item'>
                <NavLink className='nav-link' to='/'>Events</NavLink>
              </li>
            )}

            { user && user.role === 'ADMIN' && (
              <li className='nav-item'>
                <NavLink className='nav-link' to='/add'>Add Event</NavLink>
              </li>
            )}

            { user && user.role !== 'ADMIN' && (
              <li className='nav-item'>
                <NavLink className='nav-link' to='/my-bookings'>My Bookings</NavLink>
              </li>
            )}

          </ul>

          <ul className='navbar-nav'>
            { user ? (
              <>
                <li className='nav-item'>
                  <span className='navbar-text me-3'>{user.userName} ({user.role})</span>
                </li>
                <li className='nav-item'>
                  <button className='btn btn-outline-light btn-sm' onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/login'>Login</NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/register'>Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
