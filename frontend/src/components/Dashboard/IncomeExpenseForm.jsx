import React, { useState } from 'react'
import { PlusCircle, DollarSign, Tag } from 'lucide-react'

const IncomeExpenseForm = () => {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('expense')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const hostLink = import.meta.env.VITE_HOSTLINK

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const token = localStorage.getItem('token')
    if (!token) {
      setError('You must be logged in to add transactions.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${hostLink}/api/transactions/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({
          amount: type === 'expense' ? -Number(amount) : Number(amount),
          category,
          description,
          type
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add transaction')
      }

      setAmount('')
      setCategory('')
      setDescription('')
      window.location.reload() // Refresh to update transactions
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    'Salary',
    'Investments',
    'Rent',
    'Utilities',
    'Groceries',
    'Transportation',
    'Healthcare',
    'Entertainment',
    'Education',
    'Shopping',
    'Other'
  ]

  return (
    <div className='bg-white dark:bg-[#1E2939] rounded-xl shadow-lg p-6 mb-8'>
      <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6'>
        Add Transaction
      </h2>

      {error && <div className='text-red-500 text-sm mb-4'>{error}</div>}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex gap-4 mb-4'>
          <button
            type='button'
            onClick={() => setType('income')}
            className={`flex-1 py-2 px-4 rounded-md transition ${
              type === 'income'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            Income
          </button>
          <button
            type='button'
            onClick={() => setType('expense')}
            className={`flex-1 py-2 px-4 rounded-md transition ${
              type === 'expense'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            Expense
          </button>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
            Amount
          </label>
          <div className='relative text-gray-700 dark:text-gray-300'>
            <DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className=' pl-10 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='0.00'
              required
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium  text-gray-700 dark:text-gray-300 mb-1'>
            Category
          </label>
          <div className='relative text-gray-700 dark:text-gray-300'>
            <Tag className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='pl-10 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 focus:ring-indigo-500 focus:border-indigo-500'
              required
            >
              <option value=''>Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='text-gray-700 dark:text-gray-300'>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
            Description
          </label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 focus:ring-indigo-500 focus:border-indigo-500'
            placeholder='Enter description'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
        >
          {loading
            ? 'Processing...'
            : (
              <>
                <PlusCircle className='mr-2 h-5 w-5' /> Add {type === 'income' ? 'Income' : 'Expense'}
              </>
              )}
        </button>
      </form>
    </div>
  )
}

export default IncomeExpenseForm
