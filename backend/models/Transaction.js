const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true
    },
  },
  { timestamps: true } // This adds createdAt and updatedAt fields
)

module.exports = mongoose.model('Transaction', TransactionSchema)
