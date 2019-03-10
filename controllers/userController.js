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
    const newUser = await db.User.create(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router