import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile (props) {
  const { name, username, email, image } = props.user || {}
  // console.log(image)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const [copiedText, setCopiedText] = useState('')
  const [copiedElement, setCopiedElement] = useState('')
  const copyToClipboard = (element, text) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text) // Set state to show copied text
    setCopiedElement(element)
    props.showAlert(`${element} copied successfully`, '#D4EDDA')
    setTimeout(() => setCopiedText(''), 1500) // Clear message after 1.5 sec
  }

  return (
    <>
      <div className='h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 '>
        <div className='flex items-center justify-center px-4 md:px-6 text-black dark:text-white'>
          <div className='bg-white dark:bg-gray-800 bg-opacity-80 rounded-lg shadow-lg py-6 px-6 sm:px-10 w-[40vw] max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl'>

            <div className='text-center mb-6'>
              <h3 className='text-2xl md:text-3xl font-bold text-black dark:text-white'>Profile Details</h3>
              <p className='mt-1 text-sm md:text-base text-gray-700 dark:text-gray-300'>Details and information about you.</p>
              <hr className='mt-4 border-gray-300 dark:border-gray-600' />
            </div>

            <div className='lg:flex lg:items-center lg:space-x-6'>
              {image && (
                <div className='flex-shrink-0 flex items-center justify-center pb-8 lg:pb-0'>
                  <a href={image} target='_blank' rel='noreferrer'>
                    <img className='size-40 lg:size-40 md:size-40 rounded-full cursor-pointer border border-gray-300 dark:border-gray-600' src={image} alt='Profile' />
                  </a>
                </div>
              )}

              <div className='flex-1 space-y-4 w-full flex flex-col justify-center ite h-full'>
                {[
                  { label: 'Name', value: name },
                  { label: 'Username', value: username },
                  { label: 'Email', value: email }
                ].map((item, index) => (
                  <div key={index} className='grid grid-cols-2 gap-4'>
                    <dt className='text-sm md:text-base font-medium text-gray-900 dark:text-gray-100'>{item.label}</dt>
                    <dd
                      className='text-sm md:text-base cursor-pointer hover:text-gray-600 dark:hover:text-gray-400 transition text-ellipsis overflow-hidden whitespace-nowrap'
                      onClick={() => copyToClipboard(item.label || 'N/A', item.value || 'N/A')}
                    >
                      {item.value || 'N/A'}
                    </dd>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Profile
