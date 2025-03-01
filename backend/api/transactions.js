const express = require('express')
const Transaction = require('../models/Transaction')
const fetchUser = require('../middleware/fetchuser')

const router = express.Router()

// 🟢 Get all transactions
router.get('/', fetchUser, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })

    let totalBalance = 0
    let monthlyIncome = 0
    let monthlyExpenses = 0

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    transactions.forEach((transaction) => {
      totalBalance += transaction.amount

      const transactionDate = new Date(transaction.createdAt)
      if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
        if (transaction.amount > 0) {
          monthlyIncome += transaction.amount
        } else {
          monthlyExpenses += Math.abs(transaction.amount)
        }
      }
    })

    res.json({ totalBalance, monthlyIncome, monthlyExpenses, transactions })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// 🟢 Add a transaction
router.post('/add', fetchUser, async (req, res) => {
  try {
    const { amount, category, description, type } = req.body
    if (!amount || !category || !type) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const transaction = new Transaction({
      user: req.user.id,
      amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
      category,
      description,
      type
    })

    await transaction.save()
    res.status(201).json({ success: true, transaction })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
