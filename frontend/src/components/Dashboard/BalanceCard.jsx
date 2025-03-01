import React from 'react'
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'

const BalanceCard = ({ totalBalance, monthlyIncome, monthlyExpenses }) => {
  return (
    <div className='bg-white rounded-xl shadow-lg p-6 space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-gray-800'>Total Balance</h2>
        <Wallet className='text-blue-600 w-6 h-6' />
      </div>
      <div className='text-3xl font-bold text-gray-900'>
        ${totalBalance.toLocaleString()}
      </div>
      <div className='grid grid-cols-2 gap-4 pt-4'>
        <div className='space-y-2'>
          <div className='flex items-center text-green-600'>
            <TrendingUp className='w-4 h-4 mr-2' />
            <span className='text-sm'>Monthly Income</span>
          </div>
          <div className='text-lg font-semibold text-gray-800'>
            ${monthlyIncome.toLocaleString()}
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex items-center text-red-600'>
            <TrendingDown className='w-4 h-4 mr-2' />
            <span className='text-sm'>Monthly Expenses</span>
          </div>
          <div className='text-lg font-semibold text-gray-800'>
            ${monthlyExpenses.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BalanceCard
