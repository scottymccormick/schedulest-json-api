const mongoose = require('mongoose')
const db = require('./models')

const userSeed = require('./models/userSeed')

// Remove users
db.User.deleteMany({}, (err, result) => {
  if (err) console.log(err)
  console.log(`Deleted ${result.n} users.`)
  db.User.create(userSeed, (err, newUsers) => {
    if (err) console.log(err)
    console.log(`Created ${newUsers.length} new users`)
    process.exit()
  })
})