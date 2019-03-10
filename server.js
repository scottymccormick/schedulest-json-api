require('dotenv').config()
const express = require('express')
const app     = express()
const PORT    = process.env.PORT || 9001

const db = require('./models')

const orgController = require('./controllers/orgController')

app.use('/api/v1/orgs', orgController)

app.listen(PORT, () => {
  console.log('Listening on', PORT)
})