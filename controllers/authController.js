require('dotenv').config()
const express  = require('express')
const router   = express.Router()
const bcrypt   = require('bcryptjs')
const passport = require('passport')
const jwt      = require('jsonwebtoken')

const db = require('../models')

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
    res.json(newUser)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

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
        console.log('reached web token', user)
        // genereate web token
        const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET)
        return res.json({user, token})
      })
    })(req, res)
    // res.redirect('/api/v1/auth')
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router