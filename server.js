require('dotenv').config()
const express    = require('express')
const app        = express()
const PORT       = process.env.PORT || 9001
const bodyParser = require('body-parser')
const passport   = require('passport')
const cors       = require('cors')

require('./config/passport')

const db = require('./models')

// Set up middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(passport.initialize())

app.use(cors({
  origin: ['http://localhost:3000', 'https://schedulest-tool.herokuapp.com'],
  optionsSuccessStatus: 200,
  credentials: true
}))

const orgController     = require('./controllers/orgController')
const userController    = require('./controllers/userController')
const locController     = require('./controllers/locController')
const bookingController = require('./controllers/bookingController')
const authController    = require('./controllers/authController')


app.use('/api/v1/orgs', passport.authenticate('jwt', {session: false}),  orgController)
app.use('/api/v1/users', passport.authenticate('jwt', {session: false}), userController)
app.use('/api/v1/locs', passport.authenticate('jwt', {session: false}), locController)
app.use('/api/v1/bookings', passport.authenticate('jwt', {session: false}), bookingController)
app.use('/api/v1/auth', authController)

app.listen(PORT, () => {
  console.log('Listening on', PORT)
})