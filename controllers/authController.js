require('dotenv').config()
const express  = require('express')
const router   = express.Router()
const bcrypt   = require('bcryptjs')
const passport = require('passport')
const jwt      = require('jsonwebtoken')

const db = require('../models')

const formatUserResponse = ({ _id, name, email, googleId, organizations }) => {
  return { _id, name, email, googleId, organizations}
}

// home route
router.get('/', (req, res) => {
  res.json({
    message: 'found home route',
    user: req.user})
})

// USER REGISTER
router.post('/register', async (req, res) => {
  try {
    const password = req.body.password
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    const userEntry = {}
    userEntry.email = req.body.email
    userEntry.password = hashedPassword
    userEntry.name = req.body.name

    const newUser = await db.User.create(userEntry)
    res.json(formatUserResponse(newUser))
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// USER LOGIN
router.post('/login', async (req, res) => {
  try {
    passport.authenticate('local', { session: false}, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : 'Something not right',
          user: user
        })
      }
      req.login(user, {session: false}, (err) => {
        if (err) {
          return res.send(err)
        }
        // genereate web token
        const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET, {expiresIn: '1d'})
        return res.json({user: formatUserResponse(user), token})
      })
    })(req, res)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router