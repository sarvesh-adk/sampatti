import React from 'react'
import AIInvestmentAdvice from './AIInvestmentAdvice'
import { InvestAdvice } from './InvestAdvice'

function Investment () {
  return (
    <div className='flex-col space-y-12 mt-12 mr-12'>
      <InvestAdvice />
      {/* <marquee direction='left'>Hello</marquee> */}
      <AIInvestmentAdvice />
    </div>
  )
}

export default Investment
