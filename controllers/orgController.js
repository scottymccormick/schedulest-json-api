const express = require('express')
const router  = express.Router()

const db = require('../models')

// ORG INDEX
router.get('/', (req, res) => {
  res.send('Org Index route')
})

module.exports = router