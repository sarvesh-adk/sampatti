import React, { useEffect, useState } from 'react'
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'

const BalanceCard = () => {
  const [totalBalance, setTotalBalance] = useState(0)
  const [monthlyIncome, setMonthlyIncome] = useState(0)
  const [monthlyExpenses, setMonthlyExpenses] = useState(0)

  const hostLink = import.meta.env.VITE_HOSTLINK

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        const response = await fetch(`${hostLink}/api/transactions`, {
          headers: { 'auth-token': token }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch transactions')
        }

        const data = await response.json()
        setTotalBalance(data.totalBalance)
        setMonthlyIncome(data.monthlyIncome)
        setMonthlyExpenses(data.monthlyExpenses)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchTransactions()
  }, [])

  return (
    <div className='bg-white dark:bg-[#1E2939] rounded-xl shadow-lg p-6 space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
          Total Balance
        </h2>
        <Wallet className='text-blue-600 w-6 h-6' />
      </div>
      <div className='text-3xl font-bold text-gray-900 dark:text-gray-200'>
        ${totalBalance.toLocaleString()}
      </div>
      <div className='grid grid-cols-2 gap-4 pt-4'>
        <div className='space-y-2'>
          <div className='flex items-center text-green-600'>
            <TrendingUp className='w-4 h-4 mr-2' />
            <span className='text-sm'>Monthly Income</span>
          </div>
          <div className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
            ${monthlyIncome.toLocaleString()}
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex items-center text-red-600'>
            <TrendingDown className='w-4 h-4 mr-2' />
            <span className='text-sm'>Monthly Expenses</span>
          </div>
          <div className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
            ${monthlyExpenses.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BalanceCard
