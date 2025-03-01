const express = require('express')
const User = require('../models/User')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = process.env.JWTSIGN

// ROUTE 1: Create a User using: POST No Login required
router.post('/createuser', [
  body('username', 'Enter a valid username').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be 5 characters long').isLength({ min: 5 }),
  body('age', 'Enter a valid age').isNumeric()
], async (req, res) => {
  const success = false
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() })
  }

  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ success, error: 'A user with this email exists' })
    }

    user = await User.findOne({ username: req.body.username })
    if (user) {
      return res.status(400).json({ success, error: 'A user with this username exists' })
    }

    // HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)

    // Create a new user
    user = await User.create({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
      password: secPass
    })

    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET)

    res.json({ success, authToken })
  } catch {
    console.error(errors.message)
    res.status(500).send('INTERNAL SERVER ERROR')
  }
})

// ROUTE 2: Authenticate using credentials  //NO LOGIN REQUIRED
router.post('/login', [
  body('username', 'Enter a valid username').isLength({ min: 3 }),
  body('password', 'Enter a valid password').isLength({ min: 3 })
], async (req, res) => {
  let success = false

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      success = false
      return res.status(400).json('Please try to login with correct credentials.')
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      success = false
      // return res.status(400).json({error:"Sorry user does not exists"})
      return res.status(400).json({ success, error: 'Please try to login with correct credentials' })
    }

    const data = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        age: user.age
      }
    }

    console.log(data)

    const authToken = jwt.sign(data, JWT_SECRET)
    success = true
    res.json({ success, authToken, name: user.name, email: user.email, username: user.username, age: user.age })
  } catch {
    console.log(errors.messgae)
    res.status(500).send(errors.message)
  }
})

// ROUTE 3: GET LOGGEDIN USER DETAILS POST: "/api/auth/getuser" LOGIN REQUIRE
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findById(userId).select('-password')
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
