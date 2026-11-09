import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {

  const [events, setEvents] = useState([])
  const [message, setMessage] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
      axios.get('http://localhost:8080/events')
          .then((res) => setEvents(res.data))
          .catch((err) => console.log(err))
  }, [])

  const handleBook = (eventId) => {
      axios.post(`http://localhost:8080/events/${eventId}/book`, {}, { headers: { userId: user.id } })
          .then((res) => setMessage('Event booked successfully'))
          .catch((err) => setMessage(
              err.response && err.response.data && err.response.data.message
                  ? err.response.data.message : 'Booking failed'))
  }

  return (
    <div className='container'>
      <div className='row justify-content-center align-items-center g-2'>
        <div className='col'>

          { message && <div className='alert alert-info'>{message}</div> }

          { events.map((event) => (
            <div className='card mb-3' key={event.id}>
              <div className='card-body'>

                <h4 className='card-title'>{event.title}</h4>
                <p  className='card-text'>Description : {event.description}</p>
                <p  className='card-text'>Location    : {event.location}</p>
                <p  className='card-text'>Date        : {event.eventDate && event.eventDate.replace('T', ' ')}</p>
                <p  className='card-text'>Capacity    : {event.capacity}</p>

                { user.role === 'ADMIN' ? (
                  <NavLink className='btn btn-primary'
                           to={`/registrations/${event.id}`}>View Registered Users</NavLink>
                ) : (
                  <button className='btn btn-success' type='button'
                          onClick={() => handleBook(event.id)}>Book Event</button>
                )}

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Home
