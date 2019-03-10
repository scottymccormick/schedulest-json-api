const express = require('express')
const router  = express.Router()

const db = require('../models')

// ORG INDEX
router.get('/', (req, res) => {
  res.send('Org Index route')
})

// ORG CREATE
router.post('/', (req, res) => {
  db.Organization.create(req.body, (err, newOrg) => {
    if (err) {
      res.status(400).json({
        error: err
      })
    } else {
      res.json({
        message: 'Success!',
        org: newOrg
      })
    }
  })
})

module.exports = router