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
  const hostLink = import.meta.env.VITE_HOSTLINK
  const location = useLocation()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      navigate('/')
      return
    }
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    if (token) {
      localStorage.setItem('token', token)
      const cleanUrl = window.location.origin + window.location.pathname
      window.history.replaceState({}, document.title, cleanUrl)
      navigate('/')
    }
  }, [location.search, navigate])

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
    if (json.success) {
      props.showAlert('New Account Created Successfully', '#D4EDDA')
      navigate('/login')
    } else {
      props.showAlert(json.error || 'Username or email already exists', '#F8D7DA')
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900'>
      <div className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Sign up to our platform</h5>
          <div>
            <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your Name</label>
            <input type='text' id='name' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' name='name' placeholder='Name' value={credentials.name} onChange={onChange} />
          </div>
          <div className='flex gap-3'>
            <div>
              <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Username</label>
              <input type='text' id='username' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' name='username' placeholder='Username' value={credentials.username} onChange={onChange} />
            </div>
            <div>
              <label htmlFor='age' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Age</label>
              <input type='number' id='age' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' name='age' placeholder='Age' value={credentials.age} onChange={onChange} />
            </div>
          </div>
          <div>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
            <input type='email' id='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' name='email' placeholder='Email' value={credentials.email} onChange={onChange} />
          </div>
          <div>
            <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
            <input type='password' name='password' id='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' placeholder='Password' value={credentials.password} onChange={onChange} />
          </div>
          <button type='submit' className='w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-800'>Sign Up</button>
          <Link to='/login' className='text-sm font-medium text-gray-500 dark:text-gray-300'>
            Already have an account? <span className='text-indigo-600 hover:underline dark:text-indigo-400'>Login</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Signup
