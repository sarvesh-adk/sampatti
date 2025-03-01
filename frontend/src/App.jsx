import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Alert from './components/Alert'
import Profile from './components/Profile'

function App () {
  const hostLink = 'http://localhost:8000'
  const [user, setUser] = useState(null) // User state
  const [alert, setAlert] = useState(null)

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch(`${hostLink}/api/auth/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      })
      const data = await response.json()
      if (response.ok) {
        setUser(data)
        return data
      } else {
        showAlert('Failed to fetch user details', 'danger')
        return null
      }
    } catch (error) {
      showAlert('An error occurred', '#F8D7DA')
      return null
    }
  }

  // UseEffect to load user from localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserDetails(token).then(userDetails => {
        if (userDetails) {
          setUser(userDetails)
        }
      })
    }
  }, [])

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000)
  }

  return (
    <div className='bg-gray-50 dark:bg-gray-600'>
      <Alert alert={alert} />
      <Router>
        <div className='flex'>
          {/* Conditionally render Sidebar based on user */}
          {/* {user && <Sidebar user={user} showAlert={showAlert} />} */}
          <div className='flex-grow'>
            <Routes>
              <Route exact path='/' key='/' element={<Home />} />
              <Route exact path='/login' key='/login' element={<Login setUser={setUser} showAlert={showAlert} />} />
              <Route exact path='/signup' key='/signup' element={<Signup showAlert={showAlert} />} />
              <Route exact path='/profile' key='/profile' element={<Profile user={user} showAlert={showAlert} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
