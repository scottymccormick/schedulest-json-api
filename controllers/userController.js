const express = require('express')
const router  = express.Router()
const jwt     = require('jsonwebtoken')

const db = require('../models')

const formatUserResponse = ({ _id, name, email, googleId, organizations }) => {
  return { _id, name, email, googleId, organizations}
}

// USER INDEX
router.get('/', async (req, res) => {
  try {
    const allUsers = await db.User.find({})
    res.json(allUsers.map((user) => formatUserResponse(user)))
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// USER TEST LOGIN
router.get('/test', async (req, res) => {
  try {
    res.status(200).json({
      message: "You've reached a protected route",
      user: formatUserResponse(req.user)
    })
  } catch (error) {
    res.sendStatus(400)
  }
})

// USER CREATE
router.post('/', async (req, res) => {
  try {
    const existingEmailUser = req.body.email ? 
      await db.User.findOne({email: req.body.email}) : null
    const existingGoogleIdUser = req.body.googleId ?
      await db.User.findOne({googleId: req.body.googleId}) : null
    if (existingEmailUser || existingGoogleIdUser) {
      throw Error('A user with that email already exists')
    }

    const newUser = await db.User.create(req.body)
    res.status(201).json(formatUserResponse(newUser))
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// USER SHOW
router.get('/:id', async (req, res) => {
  try {
    const foundUser = await db.User.findById(req.params.id)

    res.json(formatUserResponse(foundUser))
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// USER UPDATE
router.put('/:id', async (req, res) => {
  try {
    const foundUser = await db.User.findByIdAndUpdate(
      req.params.id, req.body, {new: true})

    res.status(201).json(formatUserResponse(foundUser))
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router