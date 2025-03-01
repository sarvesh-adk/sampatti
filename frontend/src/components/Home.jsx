import React from 'react'
import GoalForm from './Dashboard/GoalForm'
import IncomeExpenseForm from './Dashboard/IncomeExpenseForm'
import BalanceCard from './Dashboard/BalanceCard'
import Sidebar from './sidebar'

function Home () {
  return (
    <>
      <Sidebar />
      <div className='flex gap-12 p-6 mr-8'>
        {/* First Column: BalanceCard & IncomeExpenseForm */}
        <div className='flex flex-col gap-6 w-1/2'>
          <BalanceCard />
          <IncomeExpenseForm />
        </div>

        {/* Second Column: GoalForm */}
        <div className='w-1/2'>
          <GoalForm />
        </div>
      </div>

    </>
  )
}

export default Home
