require('dotenv').config()
const express = require('express')
const app     = express()
const PORT    = process.env.PORT || 9001
const bodyParser = require('body-parser')

const db = require('./models')

// Set up middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const orgController = require('./controllers/orgController')

app.use('/api/v1/orgs', orgController)

app.listen(PORT, () => {
  console.log('Listening on', PORT)
})