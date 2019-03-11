const express = require('express')
const router  = express.Router()

router.get('/', (req, res) => {
  res.send('reached booking index route')
})

module.exports = router