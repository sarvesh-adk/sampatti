import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    age: '',
    name: '',
    email: ''
  })
  // const hostLink = 'http://localhost:8000'
  // const hostLink = 'https://inotebook-backend-opal.vercel.app'
  const hostLink = import.meta.env.REACT_APP_HOSTLINK
  const location = useLocation()

  useEffect(() => {
    // Check if the token is already in localStorage
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      console.log('Token already stored in localStorage:', storedToken)
      navigate('/') // Redirect to home page
      return // Exit early
    }

    // Extract the token from the URL
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    console.log('Query String:', location.search) // Debugging
    console.log('Token:', token) // Debugging

    if (token) {
      // Set the token in local storage
      localStorage.setItem('token', token)
      console.log('Token stored in localStorage:', localStorage.getItem('token')) // Debugging

      // Clear the token from the URL to prevent duplicate processing
      const cleanUrl = window.location.origin + window.location.pathname
      window.history.replaceState({}, document.title, cleanUrl)

      // Redirect to the desired page
      navigate('/')
    } else {
      console.log('No token found')
    }
  }, [location.search, navigate]) // Only depend on location.search and navigate

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, username, email, password, age } = credentials

    const response = await fetch(`${hostLink}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, username, email, password, age })
    })

    const json = await response.json()
    console.log('Response from server:', json) // Debugging

    if (json.success) {
      props.showAlert('New Account Created Successfully', '#D4EDDA')
      navigate('/login') // Redirect to login page
    } else {
      props.showAlert(json.error || 'Username or email already exists', '#F8D7DA')
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='h-screen flex justify-center items-center'>

        <div className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Sign
              up to our platform
            </h5>
            <div>
              <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your Name</label>
              <input type='text' id='name' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' name='name' placeholder='name' value={credentials.name} onChange={onChange} />
            </div>
            <div className='flex gap-3 flex-12'>
              <div>
                <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your username</label>
                <input type='text' id='username' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' name='username' placeholder='Username' value={credentials.username} onChange={onChange} />
              </div>
              <div>
                <label htmlFor='age' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your age</label>
                <input type='number' id='age' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' name='age' placeholder='age' value={credentials.age} onChange={onChange} />
              </div>
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your email</label>
              <input type='email' id='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' name='email' placeholder='email' value={credentials.email} onChange={onChange} />
            </div>
            <div>
              <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your password</label>
              <input type='password' name='password' id='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' placeholder='Password' value={credentials.password} onChange={onChange} />
            </div>
            <button type='submit' className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Sign Up</button>
            <Link to='/signup' className='text-sm font-medium text-gray-500 dark:text-gray-300'>
              Already have a Account <Link to='/login' className='text-blue-700 hover:underline dark:text-blue-500'>Login</Link>
            </Link>
          </form>
        </div>

      </div>
    </>
  )
}

export default Signup
