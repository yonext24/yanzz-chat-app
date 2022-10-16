import './login.css'
import { useNavigate } from 'react-router-dom'
import React, { useState, useContext } from 'react' 
import Error from '../../components/error/Error';
import axios from 'axios'
import { UserContext } from '../../contexts/UserContext';


export default function Login () {
  const [values, setValues] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState(false)

  const { dispatch, loading } = useContext(UserContext)

  const navigate = useNavigate()

  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
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
    dispatch({type: 'LOGIN_START'})
    try {
      const { username, password } = values
      const { data } = await axios({
        method: 'POST',
        url: process.env.NODE_ENV === 'production' ? 'fill' : 'http://localhost:8800/api/login',
        data: {
          username,
          password,
        },
        mode: 'cors',
        withCredentials: true,
      })
      if (data) {
        dispatch({type: 'LOGIN_SUCCESS', payload: data})
        navigate('/')
      }
    } catch (err) {
      console.log(err)
      dispatch({type: 'INITIAL'})
      setError(err.response?.data.message || 'Something went wrong!')
    }
  }

  return <>
  <main className='login-container'>
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type='text' placeholder='Username' id='username' />
      <input onChange={handleChange} type='password' placeholder='Password' id='password' />
      <span>You dont have an account? <a href='/register'>Register</a></span>
      <input type='submit' disabled={loading} className={`${loading ? 'loading' : ''}`} />
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