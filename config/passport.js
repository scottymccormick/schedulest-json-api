const passport      = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User          = require('../models/User')
const bcrypt        = require('bcryptjs')

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) return done(err)
      if (!user) {
        console.log('inside no user')
        return done(null, false, {message: 'No user found'})
      }
      if (!bcrypt.compareSync(password, user.password)) {
        console.log('inside compare sync')
        return done(null, false, {message: 'bad password'})
      }
      console.log('inside found the user')
      return done(null, user, {message: 'Logged in successfully'})
    })
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err)
    done(null, user)
  })
})