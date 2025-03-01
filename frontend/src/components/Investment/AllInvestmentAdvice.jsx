import React, { useState } from 'react';
import { Brain, TrendingUp, DollarSign, Shield } from 'lucide-react';

export const AIInvestmentAdvice = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [timeHorizon, setTimeHorizon] = useState('5-10');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateSuggestions = () => {
    setLoading(true);
    
    // Simulated AI investment logic based on user inputs
    let portfolioSuggestions = [];

    if (riskTolerance === 'conservative') {
      portfolioSuggestions = [
        {
          type: 'Government Bonds',
          allocation: 40,
          risk: 'Low',
          description: 'Safe, stable returns with government backing',
        },
        {
          type: 'Blue-chip Stocks',
          allocation: 30,
          risk: 'Moderate',
          description: 'Established companies with stable dividends',
        },
        {
          type: 'High-yield Savings',
          allocation: 30,
          risk: 'Low',
          description: 'Liquid savings with modest returns',
        },
      ];
    } else if (riskTolerance === 'moderate') {
      portfolioSuggestions = [
        {
          type: 'Index Funds',
          allocation: 40,
          risk: 'Moderate',
          description: 'Broad market exposure with balanced risk',
        },
        {
          type: 'Corporate Bonds',
          allocation: 30,
          risk: 'Moderate',
          description: 'Higher yields than government bonds',
        },
        {
          type: 'Growth Stocks',
          allocation: 30,
          risk: 'High',
          description: 'Potential for higher returns with increased risk',
        },
      ];
    } else {
      portfolioSuggestions = [
        {
          type: 'Growth Stocks',
          allocation: 50,
          risk: 'High',
          description: 'High-growth potential with higher volatility',
        },
        {
          type: 'Emerging Markets',
          allocation: 30,
          risk: 'High',
          description: 'Exposure to developing economies',
        },
        {
          type: 'Cryptocurrencies',
          allocation: 20,
          risk: 'Very High',
          description: 'Digital assets with high volatility',
        },
      ];
    }

    setTimeout(() => {
      setSuggestions(portfolioSuggestions);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">AI Investment Advisor</h2>
        <Brain className="text-purple-600 w-6 h-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Investment
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Risk Tolerance
          </label>
          <select
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value)}
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          >
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Investment Timeframe
          </label>
          <select
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(e.target.value)}
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          >
            <option value="0-5">0-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>
      </div>

      <button
        onClick={generateSuggestions}
        disabled={loading || !monthlyInvestment}
        className="w-full mb-8 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Get Investment Suggestions'}
      </button>

      {suggestions.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Recommended Portfolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{suggestion.type}</h4>
                  <span className="text-purple-600 font-semibold">
                    {suggestion.allocation}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                <div className="flex items-center text-sm">
                  <Shield className="w-4 h-4 mr-1 text-gray-400" />
                  <span className="text-gray-500">Risk: {suggestion.risk}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-purple-50 border border-purple-100 rounded-lg p-4">
            <div className="flex items-center text-purple-800 mb-2">
              <TrendingUp className="w-5 h-5 mr-2" />
              <h4 className="font-medium">Monthly Investment Breakdown</h4>
            </div>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-purple-700">
                  {suggestion.type}: ${((Number(monthlyInvestment) * suggestion.allocation) / 100).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
