import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'

const EventRegistrations = () => {

  const [bookings, setBookings] = useState([])
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
      axios.get(`http://localhost:8080/events/${id}/registrations`, { headers: { userId: user.id } })
          .then((res) => setBookings(res.data))
          .catch((err) => console.log(err))
  }, [])

  return (
    <div className='container'>
      <div className='row justify-content-center align-items-center g-2'>
        <div className='col'>
          <div className='card'>
            <div className='card-body'>

              <h4 className='card-title'>
                Registered Users {bookings.length > 0 && `- ${bookings[0].event.title}`}
              </h4>

              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Booked At</th>
                  </tr>
                </thead>
                <tbody>
                  { bookings.map((b, i) => (
                    <tr key={b.id}>
                      <td>{i + 1}</td>
                      <td>{b.user.userName}</td>
                      <td>{b.user.email}</td>
                      <td>{b.bookedAt && b.bookedAt.replace('T', ' ').substring(0, 16)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              { bookings.length === 0 && <p className='card-text'>No users registered yet.</p> }

              <NavLink className='btn btn-secondary' to='/'>Back to Events</NavLink>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventRegistrations
