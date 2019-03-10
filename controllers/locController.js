const express = require('express')
const router  = express.Router()

const db = require('../models')

// LOC INDEX
router.get('/', (req, res) => {
  res.send('found loc index route')
})

// LOC CREATE
router.post('/', async (req, res) => {
  try {
    const newLocation = await db.Location.create(req.body)
    res.json(newLocation)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router