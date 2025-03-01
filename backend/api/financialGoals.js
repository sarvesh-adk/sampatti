const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const fetchUser = require('../middleware/fetchuser')
const FinancialGoal = require('../models/FinancialGoal')

// Route to add a new financial goal
router.post('/add', fetchUser, [
  body('title', 'Title is required').notEmpty(),
  body('amount', 'Amount is required').isNumeric(),
  body('targetDate', 'Target date is required').isDate()
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { title, amount, targetDate } = req.body
    const financialGoal = new FinancialGoal({
      user: req.user.id,
      title,
      amount,
      targetDate
    })

    const savedGoal = await financialGoal.save()
    res.json(savedGoal)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
