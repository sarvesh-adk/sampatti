import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { Briefcase, TrendingUp, Shield } from 'lucide-react'

// Defining the risk profile allocations
const riskProfiles = {
  conservative: {
    stocks: 30,
    bonds: 50,
    cash: 20
  },
  moderate: {
    stocks: 60,
    bonds: 30,
    cash: 10
  },
  aggressive: {
    stocks: 80,
    bonds: 15,
    cash: 5
  }
}

// Define colors for the chart slices based on your theme
const COLORS = ['#4F46E5', '#10B981', '#6B7280']

export const InvestAdvice = () => {
  // The user's selected risk profile
  const profile = 'moderate' // This could come from user data or state
  const data = Object.entries(riskProfiles[profile]).map(([name, value]) => ({
    name,
    value
  }))

  return (
    <div className=' bg-gray-50 dark:bg-[#1E2939] rounded-xl shadow-lg p-6 text-white'>
      <h2 className='text-2xl font-bold text-[#FF0000] mb-6'>Investment Strategy</h2>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Pie chart section */}
        <div>
          <h3 className='text-lg font-semibold text-[#FF6500] mb-4'>
            Recommended Asset Allocation
          </h3>
          <div className='h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={data}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey='value'
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Text-based information section */}
        <div className='space-y-6'>
          {/* Risk Level Information */}
          <div className='flex items-start space-x-4'>
            <div className='flex-shrink-0'>
              <Shield className='w-6 h-6 text-[#FF6500]' />
            </div>
            <div>
              <h4 className='text-lg font-medium text-[#FF6500]'>Risk Level</h4>
              <p className='text-gray-600 dark:text-gray-500'>
                Your profile indicates a moderate risk tolerance, suitable for long-term growth
                while maintaining some stability.
              </p>
            </div>
          </div>

          {/* Investment Strategy Information */}
          <div className='flex items-start space-x-4'>
            <div className='flex-shrink-0'>
              <Briefcase className='w-6 h-6 text-[#1E3E62]' />
            </div>
            <div>
              <h4 className='text-lg font-medium text-[#FF6500]'>Investment Strategy</h4>
              <p className='text-gray-600 dark:text-gray-500'>
                A balanced approach with a mix of stocks for growth and bonds for stability.
                Regular rebalancing is recommended.
              </p>
            </div>
          </div>

          {/* Next Steps Information */}
          <div className='flex items-start space-x-4'>
            <div className='flex-shrink-0'>
              <TrendingUp className='w-6 h-6 text-[#1E3E62]' />
            </div>
            <div>
              <h4 className='text-lg font-medium text-[#FF6500]'>Next Steps</h4>
              <ul className='text-gray-600 dark:text-gray-500 list-disc list-inside'>
                <li>Review and adjust your portfolio quarterly</li>
                <li>Consider increasing your monthly investment amount</li>
                <li>Diversify across different sectors and regions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
