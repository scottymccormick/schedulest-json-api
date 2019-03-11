require('dotenv').config()
const express    = require('express')
const app        = express()
const PORT       = process.env.PORT || 9001
const bodyParser = require('body-parser')
const passport   = require('passport')

require('./config/passport')

const db = require('./models')

// Set up middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(passport.initialize())

const orgController     = require('./controllers/orgController')
const userController    = require('./controllers/userController')
const locController     = require('./controllers/locController')
const bookingController = require('./controllers/bookingController')

app.use('/api/v1/orgs', orgController)
app.use('/api/v1/users', userController)
app.use('/api/v1/locs', locController)
app.use('/api/v1/bookings', bookingController)


app.listen(PORT, () => {
  console.log('Listening on', PORT)
})