const express = require('express')
const router  = express.Router()

const db = require('../models')

const dateSort = (a, b) => {
  if (a.date < b.date) return -1
  if (a.date > b.date) return 1
  return 0
}

const timeSort = (a, b) => {
  if (a.startTime < b.startTime) return -1
  if (a.startTime > b.startTime) return 1
  return 0
}

//  BOOKING INDEX
router.get('/', async (req, res) => {
  try {
    if (!req.query.org) {
      const allBookings = await db.Booking.find({})
      res.json(allBookings)
    } else {
      // get all users for a certain org
      const orgLocs = await db.Location.find({organization: req.query.org})

      // group by location
      if (!req.query.groupBy) {

        orgLocs.sort((a,b) => {
          const nameA = a.name.toLowerCase()
          const nameB = b.name.toLowerCase()
          if (nameA < nameB) return -1
          if (nameA > nameB) return 1
          return 0
        })
        
        const responseBody = []
        
        for (let i = 0; i < orgLocs.length; i++) {
          const location = orgLocs[i];
          const locBookings = await db.Booking.find({location: location._id})
          responseBody.push({
            info: location,
            bookings: locBookings.sort(dateSort)
          })
        }
        res.json(responseBody)

      // group by date, one location, one org, date range
      } else {
        const locationId = req.query.loc
        const startDate = req.query.from
        const endDate = req.query.to
        const locBookings = await db.Booking.find({
          location: locationId,
          date: {
            $gte: startDate,
            $lte: endDate
          }
        })
        const dateMap = {}
        locBookings.map((booking) => {
          const bookingDate = booking.date.toDateString()
          const existingArr = dateMap[bookingDate] || []
          dateMap[bookingDate] = [...existingArr,  booking]
        })
        for (let date in dateMap) {
          dateMap[date] = dateMap[date].sort(timeSort)
        }
        res.json(dateMap)
      }


    }


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

// BOOKING UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updatedBooking = await db.Booking.findByIdAndUpdate(
      req.params.id, req.body, {new: true}
    )
    res.json(updatedBooking)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// BOOKING DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedBooking = await db.Booking.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router