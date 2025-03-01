import React, { useState } from 'react'
import { Target, Calendar } from 'lucide-react'

export const GoalForm = () => {
  const [name, setName] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [deadline, setDeadline] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from('financial_goals').insert([
        {
          name,
          target_amount: Number(targetAmount),
          deadline,
          category,
          current_amount: 0
        }
      ])

      if (error) throw error

      // Reset form
      setName('')
      setTargetAmount('')
      setDeadline('')
      setCategory('')

      // Refresh the page to show new goal
      window.location.reload()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-white rounded-xl shadow-lg p-6 mb-8'>
      <h2 className='text-xl font-semibold text-gray-800 mb-6'>Add Financial Goal</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Goal Name
          </label>
          <div className='relative'>
            <Target className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
              placeholder='e.g., Buy a House'
              required
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Target Amount
          </label>
          <input
            type='number'
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className='block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
            placeholder='0.00'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Deadline
          </label>
          <div className='relative'>
            <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
            <input
              type='date'
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className='pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Category
          </label>
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
            placeholder='e.g., Savings'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Goal'}
        </button>
      </form>
    </div>
  )
}

export default GoalForm
