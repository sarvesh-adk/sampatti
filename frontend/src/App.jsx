import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Alert from './components/Alert'
import Profile from './components/Profile'
import Sidebar from './components/sidebar'

function App () {
  const hostLink = import.meta.env.VITE_HOSTLINK
  const [alert, setAlert] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const showAlert = (message, type) => {
    setAlert({ msg: message, type })
    setTimeout(() => setAlert(null), 2000)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserDetails(token)
    } else {
      setLoading(false)
    }
  }, [])

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
      } else {
        localStorage.removeItem('token')
        showAlert('Session expired. Please log in again.', 'danger')
      }
    } catch (error) {
      showAlert('An error occurred', 'danger')
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <p className='text-lg font-medium text-gray-700 dark:text-white'>Loading...</p>
      </div>
    )
  }

  return (
    <Router>
      <div className='bg-gray-100 dark:bg-gray-900'>
        <Alert alert={alert} />
        <div className='flex'>
          {user && <Sidebar user={user} showAlert={showAlert} />}
          <div className='flex-grow'>
            <Routes>
              <Route path='/login' element={user ? <Navigate to='/' /> : <Login setUser={setUser} showAlert={showAlert} />} />
              <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup showAlert={showAlert} />} />
              <Route path='/' element={<ProtectedRoute user={user}><Home /></ProtectedRoute>} />
              <Route path='/profile' element={<ProtectedRoute user={user}><Profile user={user} showAlert={showAlert} /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to='/login' />
}

export default App
