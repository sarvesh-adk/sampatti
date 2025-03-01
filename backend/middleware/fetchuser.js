const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWTSIGN

const fetchUser = (req, res, next) => {
  const token = req.header('auth-token')

  if (!token) {
    return res.status(401).json({ error: 'Please authenticate using a valid token' })
  }

  try {
    // Verify token using JWT_SECRET
    const data = jwt.verify(token, JWT_SECRET)

    // Support multiple token structures
    req.user = data.user || data

    // Ensure user ID exists
    if (!req.user.id) {
      return res.status(401).json({ error: 'Invalid token structure' })
    }

    next()
  } catch (error) {
    console.error('Token verification error:', error)
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

module.exports = fetchUser
