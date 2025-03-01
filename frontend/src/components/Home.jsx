import React from 'react'
// import FinGoalForm from './Dashboard/FinGoalForm'
import GoalForm from './Dashboard/GoalForm'
import IncomeExpenseForm from './Dashboard/IncomeExpenseForm'
import BalanceCard from './Dashboard/BalanceCard'
import Sidebar from './sidebar'
// import GoalProgress from './Dashboard/GoalProgress'

function Home () {
  return (
    <div>
      {/* <FinGoalForm /> */}
      <Sidebar />
      <BalanceCard />
      <IncomeExpenseForm />
      <GoalForm />
      {/* <GoalsDashboard /> */}
      {/* <GoalProgress /> */}
    </div>
  )
}

export default Home
