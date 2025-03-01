import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Presentation, Bolt, User, LogOut } from 'lucide-react'

function Sidebar (props) {
  // const navigate = useNavigate()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    props.showAlert('Logged Out', '#D4EDDA')
    window.location.reload()
    // setIsProfileOpen(false)
  }
  if (!props.user) return null
  return (
    <div>
      <button data-drawer-target='default-sidebar' data-drawer-toggle='default-sidebar' aria-controls='default-sidebar' type='button' className='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'>
        <span className='sr-only'>Open sidebar</span>
        <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
          <path clip-rule='evenodd' fill-rule='evenodd' d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z' />
        </svg>
      </button>

      <aside id='default-sidebar' className='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0' aria-label='Sidebar'>
        <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
          <div className='logo'>LOGO</div>
          <nav className='flex flex-col space-y-4'>
            <Link to='/' className='flex items-center'>
              <LayoutDashboard className='mr-2' />
              <span>Dashboard</span>
            </Link>
            <div className='flex items-center'>
              <Presentation className='mr-2' />
              <span>Presentation</span>
            </div>
            <div className='flex items-center'>
              <Bolt className='mr-2' />
              <span>Bolt</span>
            </div>
            <Link to='/profile' className='flex items-center'>
              <User className='mr-2' />
              <span>Profile</span>
            </Link>
            <div className='flex items-center cursor-pointer' onClick={handleLogout}>
              <LogOut className='mr-2' />
              <span>Logout</span>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
