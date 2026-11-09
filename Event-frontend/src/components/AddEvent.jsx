import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddEvent = () => {

  const [event, setEvent] = useState({
      title: '', description: '', location: '', eventDate: '', capacity: ''
  })

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleSubmit = (e) => {
      e.preventDefault()
      const body = {
          ...event,
          capacity: Number(event.capacity)
      }
      axios.post('http://localhost:8080/events', body, { headers: { userId: user.id } })
          .then((res) => navigate('/'))
          .catch((err) => console.log(err))
  }

  return (
    <div className='container'>
      <div className='row justify-content-center align-items-center g-2'>
        <div className='col'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title'>Add Event</h4>
              <form onSubmit={handleSubmit}>

                <div className='form-floating mb-3'>
                  <input type='text' className='form-control'
                    id='f1' placeholder=''
                    onChange={(e) => setEvent({...event, title: e.target.value})} />
                  <label htmlFor='f1'>Title</label>
                </div>

                <div className='form-floating mb-3'>
                  <input type='text' className='form-control'
                    id='f2' placeholder=''
                    onChange={(e) => setEvent({...event, description: e.target.value})} />
                  <label htmlFor='f2'>Description</label>
                </div>

                <div className='form-floating mb-3'>
                  <input type='text' className='form-control'
                    id='f3' placeholder=''
                    onChange={(e) => setEvent({...event, location: e.target.value})} />
                  <label htmlFor='f3'>Location</label>
                </div>

                <div className='form-floating mb-3'>
                  <input type='datetime-local' className='form-control'
                    id='f4' placeholder=''
                    onChange={(e) => setEvent({...event, eventDate: e.target.value})} />
                  <label htmlFor='f4'>Event Date</label>
                </div>

                <div className='form-floating mb-3'>
                  <input type='text' className='form-control'
                    id='f5' placeholder=''
                    onChange={(e) => setEvent({...event, capacity: e.target.value})} />
                  <label htmlFor='f5'>Capacity</label>
                </div>

                <button type='submit' className='btn btn-primary'>Add</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEvent
