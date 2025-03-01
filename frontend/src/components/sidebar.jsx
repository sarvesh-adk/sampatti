import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Book, ChartArea, User, LogOut, Menu, X } from 'lucide-react'

function Sidebar (props) {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Education', href: '/education', icon: Book },
    { name: 'Investment', href: '/investment', icon: ChartArea },
    { name: 'Profile', href: '/profile', icon: User }
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    props.showAlert('Logged Out', '#D4EDDA')
    window.location.reload()
  }

  if (!props.user) return null

  return (
    <div className='flex'>
      {/* Sidebar */}
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${sidebarOpen ? 'w-54' : 'w-20'} w-[17%] transition-width duration-300`}>
        {/* Mobile menu */}
        <div className='lg:hidden'>
          <div className='flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-2 shadow-sm'>
            <Link to='/' className='text-xl font-bold text-indigo-600 dark:text-indigo-400'>
              Sampatti
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'
            >
              {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div
              className='fixed inset-0 z-40 bg-black bg-opacity-25'
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className='fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg'>
                <div className='flex flex-col h-full'>
                  <div className='flex-1 py-4 overflow-y-auto'>
                    <nav className='px-2 space-y-1'>
                      {navigation.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`${
                              location.pathname === item.href
                                ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-300'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                            } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                          >
                            <Icon className='mr-4 h-6 w-6' />
                            {item.name}
                          </Link>
                        )
                      })}
                    </nav>
                  </div>
                  <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
                    <button
                      onClick={handleLogout}
                      className='flex items-center w-full px-2 py-2 text-base font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800'
                    >
                      <LogOut className='mr-4 h-6 w-6' />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop sidebar */}
        <div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col'>
          <div className='flex flex-col flex-grow bg-white dark:bg-gray-800 pt-5 pb-4 overflow-y-auto'>
            <div className='flex items-center flex-shrink-0 px-4'>
              <Link to='/' className='text-xl font-bold text-indigo-600 dark:text-indigo-400'>
                Sampatti
              </Link>
            </div>
            <nav className='mt-5 flex-1 px-2 space-y-1'>
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <Icon className='mr-3 h-6 w-6' />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
              <button
                onClick={handleLogout}
                className='flex items-center w-full px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800'
              >
                <LogOut className='mr-3 h-6 w-6' />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 transition-margin duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <main className='flex-1 py-8'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            {props.children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Sidebar
