import './register.css'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react' 
import Error from '../../components/error/Error';
import axios from 'axios'

export default function Login () {
  const [values, setValues] = useState({
    username: '',
    password: '',
    email: '',
    confirm_password: '', 
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (values.password !== values.confirm_password) {
      setError('Passwords must be equal.')
      return false
    } else if (username === "") {
      setError('Email and password is required.')
      return false;
    } else if (password === "") {
      setError('Email and password is required')
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    try {
      const { username, password, email } = values
      const { data } = await axios({
        method: 'POST',
        url: process.env.NODE_ENV === 'production' ? 'hola' : 'http://localhost:8800/api/register',
        data: {
          username,
          email,
          password,
        }
      })
      setLoading(false)
      if (data) navigate('/')
    } catch (err) {
      setLoading(false)
      setError(err.response.data.message)
    }
  }

  return <>
  <main className='register-container'>
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type='text' placeholder='Username' id='username' />
      <input onChange={handleChange} type='email' placeholder='Email' id='email' />
      <input onChange={handleChange} type='password' placeholder='Password' id='password' />
      <input onChange={handleChange} type='password' placeholder='Confirm Password' id='confirm_password' />
      <span>You already have an account? <a href='/login'>Log In</a></span>
      <input type='submit' disabled={loading} className={loading ? 'loading' : ''} />
      {
        loading && <div className='loading-modal'>
          <div className='spinner'></div>
        </div>
      }
    </form>
  </main>
  {
    error && <Error error={error} parentSetError={setError}/>
  }
  </>
}