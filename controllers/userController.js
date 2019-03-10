const express = require('express')
const router  = express.Router()

const db = require('../models')

// USER INDEX
router.get('/', async (req, res) => {
  try {
    const allUsers = await db.User.find({})
    res.json(allUsers)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// USER CREATE
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const existingEmailUser = req.body.email ? 
      await db.User.findOne({email: req.body.email}) : null
    const existingGoogleIdUser = req.body.googleId ?
      await db.User.findOne({googleId: req.body.googleId}) : null
    console.log(existingEmailUser)
    console.log(existingGoogleIdUser)
    if (existingEmailUser || existingGoogleIdUser) {
      throw Error('A user with that email already exists')
    }
    const newUser = await db.User.create(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router