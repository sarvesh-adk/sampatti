import React from 'react'
import { Book, Video, Award } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: 'Budgeting Basics',
    description: 'Learn the fundamentals of creating and maintaining a budget',
    icon: <Book className='w-6 h-6' />,
    duration: '2 hours',
    level: 'Beginner'
  },
  {
    id: 2,
    title: 'Investment Fundamentals',
    description: 'Understanding different investment vehicles and strategies',
    icon: <Video className='w-6 h-6' />,
    duration: '3 hours',
    level: 'Intermediate'
  },
  {
    id: 3,
    title: 'Retirement Planning',
    description: 'Comprehensive guide to planning for retirement',
    icon: <Award className='w-6 h-6' />,
    duration: '4 hours',
    level: 'Advanced'
  }
]

export const EducationHub = () => {
  return (
    <div className='bg-gray-100 dark:bg-[#1E2939] rounded-xl shadow-lg p-6 mt-12 mr-12 '>
      <h2 className='text-2xl font-bold text-gray-900 mb-6 dark:text-white'>Financial Education</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {courses.map((course) => (
          <div
            key={course.id}
            className='border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow'
          >
            <div className='flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4'>
              {course.icon}
            </div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-300  mb-2'>
              {course.title}
            </h3>
            <p className='text-gray-600 mb-4 dark:text-gray-300'>{course.description}</p>
            <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-300'>
              <span>{course.duration}</span>
              <span>{course.level}</span>
            </div>
            <button className='mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors'>
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
