import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MyBookings = () => {

  const [bookings, setBookings] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
      axios.get(`http://localhost:8080/users/${user.id}/bookings`)
          .then((res) => setBookings(res.data))
          .catch((err) => console.log(err))
  }, [])

  return (
    <div className='container'>
      <div className='row justify-content-center align-items-center g-2'>
        <div className='col'>

          <h4>My Bookings</h4>

          { bookings.length === 0 && <p>You have not booked any events yet.</p> }

          { bookings.map((b) => (
            <div className='card mb-3' key={b.id}>
              <div className='card-body'>
                <h4 className='card-title'>{b.event.title}</h4>
                <p  className='card-text'>Location : {b.event.location}</p>
                <p  className='card-text'>Date     : {b.event.eventDate && b.event.eventDate.replace('T', ' ')}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default MyBookings
