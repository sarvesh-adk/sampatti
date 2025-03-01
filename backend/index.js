const express = require('express')
const connectToMongo = require('./db')

connectToMongo()
const cors = require('cors')

const PORT = 8000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token', 'Access-Control-Allow-Origin'],
  credentials: true
}

app.use(cors(corsOptions))

app.use('/api/auth', require('./api/auth'))
app.use('/api/financialGoals', require('./api/financialGoals')) // Ensure this line is present

app.get('/', (req, res) => {
  res.send('Backend Route for Sampatti')
})

app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`)
})
