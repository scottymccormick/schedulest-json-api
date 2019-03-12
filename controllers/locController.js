const express = require('express')
const router  = express.Router()

const db = require('../models')

// LOC INDEX
router.get('/', async (req, res) => {
  try {
    if (!req.query.org) {
      const allLocations = await db.Location.find({})
      res.json(allLocations)
    } else {
      // get all users for a certain org
      const orgLocs = await db.Location.find({organization: req.query.org})
      orgLocs.sort((a,b) => {
        const nameA = a.name.toLowerCase()
        const nameB = b.name.toLowerCase()
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
      })
      res.json(orgLocs)
    }
  } catch (error) {
    res.status(400).json({message: error.message})
  }
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

// LOC SHOW
router.get('/:id', async (req, res) => {
  try {
    const foundLocation = await db.Location.findById(req.params.id)
    res.json(foundLocation)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// LOC UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updatedLocation = await db.Location.findByIdAndUpdate(
      req.params.id, req.body, {new: true}
    )
    res.json(updatedLocation)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// LOC DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedLocation = await db.Location.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router