import React, { useState, useEffect } from 'react'
import { Target, Calendar } from 'lucide-react'

const GoalForm = () => {
  const [name, setName] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [deadline, setDeadline] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [goals, setGoals] = useState([])

  const hostLink = import.meta.env.VITE_HOSTLINK

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setError('You must be logged in to view financial goals.')
      return
    }

    try {
      const response = await fetch(`${hostLink}/api/financialGoals/get`, {
        method: 'GET',
        headers: { 'auth-token': token }
      })
      if (!response.ok) throw new Error('Failed to fetch goals')
      const data = await response.json()
      setGoals(data)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const token = localStorage.getItem('token')
    if (!token) {
      setError('You must be logged in to add a financial goal.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${hostLink}/api/financialGoals/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({
          title: name,
          amount: Number(targetAmount),
          targetDate: deadline
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add financial goal')
      }

      setName('')
      setTargetAmount('')
      setDeadline('')
      fetchGoals()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-white dark:bg-[#1E2939] text-gray-900 dark:text-gray-100 rounded-xl shadow-lg p-6 mb-8 transition-colors duration-300'>
      <h2 className='text-xl font-semibold mb-6'>Add Financial Goal</h2>

      {error && <div className='text-red-500 text-sm mb-4'>{error}</div>}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Goal Name</label>
          <div className='relative'>
            <Target className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5' />
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='pl-10 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-2 focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='e.g., Buy a House'
              required
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>Target Amount</label>
          <input
            type='number'
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className='block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-2 focus:ring-indigo-500 focus:border-indigo-500'
            placeholder='0.00'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>Deadline</label>
          <div className='relative'>
            <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5' />
            <input
              type='date'
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className='pl-10 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-2 focus:ring-indigo-500 focus:border-indigo-500'
              required
            />
          </div>
        </div>

        <button
          type='submit'
          className='w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300'
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Goal'}
        </button>
      </form>

      <div className='mt-8'>
        <h3 className='text-lg font-semibold mb-4'>Your Financial Goals</h3>

        {goals.length === 0
          ? (
            <p className='text-gray-500 dark:text-gray-400'>No goals added yet.</p>
            )
          : (
            <ul className='space-y-4'>
              {goals.sort((a, b) => new Date(b.targetDate) - new Date(a.targetDate)).map((goal) => (
                <li
                  key={goal._id}
                  className='bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow border-l-4 border-indigo-500 dark:border-indigo-400 transition-colors duration-300'
                >
                  <h4 className='text-md font-medium'>{goal.title}</h4>
                  <p className='text-sm'>🎯 Target Amount: ${goal.amount}</p>
                  <p className='text-sm'>📅 Deadline: {new Date(goal.targetDate).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
            )}
      </div>
    </div>
  )
}

export default GoalForm
