const express = require('express')
const router  = express.Router()
const bcrypt  = require('bcryptjs')

const db = require('../models')

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

router.post('/login', (req, res) => {
  try {
    res.send('login route reached')
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router