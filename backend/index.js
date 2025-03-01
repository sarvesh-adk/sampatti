const express = require('express')
const connectToMongo = require('./db')

connectToMongo()
const cors = require('cors')

const PORT = 8000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://sampatti.vercel.app')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.sendStatus(200)
})

// app.use(cors(corsOptions))

app.use('/api/auth', require('./api/auth'))
app.use('/api/financialGoals', require('./api/financialGoals')) // Ensure this line is present
app.use('/api/transactions', require('./api/transactions'))

app.get('/', (req, res) => {
  res.send('Backend Route for Sampatti')
})

app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`)
})
