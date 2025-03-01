import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

function Login (props) {
  const hostLink = import.meta.env.VITE_HOSTLINK
  console.log(hostLink)
  // const hostLink = 'http://localhost:8000'
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      navigate('/') // Redirect to home page
      return // Exit early
    }
    // Extract the token from the URL
    const params = new URLSearchParams(location.search)
    const token = params.get('token')

    if (token) {
      localStorage.setItem('token', token)

      // Clear the token from the URL to prevent duplicate processing
      const cleanUrl = window.location.origin + window.location.pathname
      window.history.replaceState({}, document.title, cleanUrl)
      navigate('/login')
    } else {
      const error = params.get('error')
      if (error) {
        props.showAlert('Invalid Credentials', '#F8D7DA')
      }
    }
  }, [location.search, navigate]) // Only depend on location.search and navigate

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${hostLink}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password
      })
    })

    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      props.setUser({
        username: credentials.username,
        email: json.email,
        name: json.name
      })
      navigate('/')
      props.showAlert('Logged in successfully', '#D4EDDA')
    } else {
      props.showAlert('Invalid Credentials', '#F8D7DA')
    }
  }

  return (
    <div className='h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900'>
      <div className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Sign in to our platform</h5>
          <div>
            <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your username</label>
            <input type='text' id='username' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' name='username' placeholder='Username' value={credentials.username} onChange={onChange} />
          </div>
          <div>
            <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your password</label>
            <input type='password' name='password' id='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' placeholder='Password' value={credentials.password} onChange={onChange} />
          </div>
          <button type='submit' className='w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-800'>Login to your account</button>
          <Link to='/signup' className='text-sm font-medium text-gray-500 dark:text-gray-300'>
            Not registered? <span className='text-indigo-600 hover:underline dark:text-indigo-400'>Create account</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login
