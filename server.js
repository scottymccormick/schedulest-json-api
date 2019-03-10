require('dotenv').config()
const express = require('express')
const app     = express()
const PORT    = process.env.PORT || 9001

require('./models')

app.listen(PORT, () => {
  console.log('Listening on', PORT)
})