const express = require('express')
const router  = express.Router()

const db = require('../models')

//  BOOKING INDEX
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

// BOOKING SHOW
router.get('/:id', async (req, res) => {
  try {
    const foundBooking = await db.Booking.findById(req.params.id)
    res.json(foundBooking)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router