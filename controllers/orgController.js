const express = require('express')
const router  = express.Router()

const db = require('../models')

// ORG INDEX
router.get('/', (req, res) => {
  db.Organization.find({}, (error, foundOrgs) => {
     if (error) {
       res.status(400).json({ error })
     } else {
       res.json({
         body: foundOrgs
       })
     }
  })
})

// ORG CREATE
router.post('/', (req, res) => {
  db.Organization.findOne({name: req.body.name}, (error, foundOrg) => {
    if (foundOrg) {
      res.status(400).json({
        message: 'An organization with that name already exists.'
      })
    } else {
      db.Organization.create(req.body, (error, newOrg) => {
        if (error) {
          res.status(400).json({ error })
        } else {
          res.json({
            message: 'Success!',
            org: newOrg
          })
        }
      })
    }
  })
})

module.exports = router