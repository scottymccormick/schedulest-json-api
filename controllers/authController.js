require('dotenv').config()
const express  = require('express')
const router   = express.Router()
const bcrypt   = require('bcryptjs')
const passport = require('passport')
const jwt      = require('jsonwebtoken')

const db = require('../models')

const formatUserResponse = ({ _id, name, email, googleId, organizations }) => {
  return { _id, name, email, googleId, organizations}
}

// home route
router.get('/', (req, res) => {
  res.json({
    message: 'found home route',
    user: req.user})
})

// USER REGISTER
router.post('/register', async (req, res) => {
  try {
    const password = req.body.password
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    const userEntry = {}
    userEntry.email = req.body.email
    userEntry.password = hashedPassword
    userEntry.name = req.body.name

    // Add ability to create organization when registering
    if (req.body.orgName) {
      const existingOrg = await db.Organization.findOne({name: req.body.orgName})
      if (existingOrg) {
        throw Error('An organization with that name already exists.')
      }
      const newOrgBody = {
        name: req.body.orgName,
        hourlyRate: 20,
        dayRate: 80,
        cancelTime: 24
      }
      const newOrg = await db.Organization.create(newOrgBody)
      userEntry.organizations = [newOrg._id]
    } else {
      userEntry.organizations = [req.body.orgId]
    }
    const newUser = await db.User.create(userEntry)
    // add user to their new org
    if (req.body.orgName) {
      const newOrgId = userEntry.organizations[0]
      const newOrgData = {
        admins: [newUser._id]
      }
      await db.Organization.findByIdAndUpdate(newOrgId, newOrgData)
    }
    
    const token = jwt.sign(JSON.parse(JSON.stringify(newUser)), process.env.JWT_SECRET, {expiresIn: '1h'})

    res.json({user: formatUserResponse(newUser), token})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// USER LOGIN
router.post('/login', async (req, res) => {
  try {
    passport.authenticate('local', { session: false}, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : 'Something not right',
          user: user
        })
      }
      req.login(user, {session: false}, (err) => {
        if (err) {
          return res.send(err)
        }
        // genereate web token - have to fix mongo object issue
        const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_SECRET, {expiresIn: '1h'})
        return res.json({user: formatUserResponse(user), token})
      })
    })(req, res)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router