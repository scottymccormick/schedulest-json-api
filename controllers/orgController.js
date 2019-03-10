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
    res.json({org: newOrg})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router