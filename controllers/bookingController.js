const express = require('express')
const router  = express.Router()

const db = require('../models')

router.get('/', async (req, res) => {
  try {
    const allBookings = await db.Booking.find({})
    res.json(allBookings)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// BOOKING CREATE
router.post('/', async (req, res) => {
  try {
    const newBooking = await db.Booking.create(req.body)
    res.json(newBooking)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router