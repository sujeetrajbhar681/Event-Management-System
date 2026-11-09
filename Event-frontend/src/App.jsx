import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import MyBookings from './components/MyBookings'
import AddEvent from './components/AddEvent'
import EventRegistrations from './components/EventRegistrations'

export const getUser = () => {
  try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
}

const App = () => {
  const user = getUser()
  const isAdmin = user && user.role === 'ADMIN'

  return (
    <>
      <Navbar />
      <div className='mt-4'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/my-bookings' element={user ? <MyBookings /> : <Navigate to='/login' />} />
          <Route path='/add' element={isAdmin ? <AddEvent /> : <Navigate to='/' />} />
          <Route path='/registrations/:id' element={isAdmin ? <EventRegistrations /> : <Navigate to='/' />} />
        </Routes>
      </div>
    </>
  )
}

export default App
