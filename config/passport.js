const passport      = require('passport')
require('dotenv').config()
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy   = require('passport-jwt').Strategy
const ExtractJWT    = require('passport-jwt').ExtractJwt
const User          = require('../models/User')
const bcrypt        = require('bcryptjs')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
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

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
  function (jwtPayload, done) {
    return User.findById(jwtPayload._id)
      .then(user => {
        return done(null, user)
      })
      .catch(err => {
        return done(err)
      })
  }
))

// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     if (err) return done(err)
//     done(null, user)
//   })
// })