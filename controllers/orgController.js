const express = require('express')
const router  = express.Router()

const db = require('../models')

// ORG INDEX
router.get('/', async (req, res) => {
  try {
    const foundOrgs = await db.Organization.find({})
    res.json([...foundOrgs])
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// ORG CREATE
router.post('/', async (req, res) => {
  try {
    const existingOrg = await db.Organization.findOne({name: req.body.name})
    if (existingOrg) {
      throw Error('An organization with that name already exists.')
    }
    const newOrg = await db.Organization.create(req.body)
    res.status(201).json(newOrg)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// ORG SHOW
router.get('/:id', async (req, res) => {
  try {
    const foundOrg = await db.Organization.findById(req.params.id)
    res.json(foundOrg)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// ORG UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updatedOrg = await db.Organization.findByIdAndUpdate(
      req.params.id, req.body, {new: true}
    )
    res.json(updatedOrg)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router