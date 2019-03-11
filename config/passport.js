const passport      = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User          = require('../models/User')

passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ email }, function(err, user) {
      if (err) return done(err)
      if (!user) return done(null, false)
      if (user.password !== password) return done(null, false)
      return done(null, user)
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