const express = require('express')
const router  = express.Router()

router.get('/', (req, res) => {
  res.send('Reached get route of user')
})

module.exports = router