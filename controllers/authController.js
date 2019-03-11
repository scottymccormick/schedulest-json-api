const express = require('express')
const router  = express.Router()

const db = require('../models')

router.post('/login', (req, res) => {
  try {
    res.send('login route reached')
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router