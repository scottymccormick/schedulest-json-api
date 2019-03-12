const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')
const db = require('./models')

const userSeed = require('./models/userSeed')
const orgSeed  = require('./models/orgSeed')
const locSeed  = require('./models/locSeed')

const runSeedProcess = async () => {
  try {
    // Remove users
    const deletedUsers = await db.User.deleteMany({})
    console.log(`Deleted ${deletedUsers.n} users.`)

    // Remove organizations
    const deletedOrgs = await db.Organization.deleteMany({})
    console.log(`Deleted ${deletedOrgs.n} organizations`)

    // Remove locations
    const deletedLocs = await db.Location.deleteMany({})
    console.log(`Deleted ${deletedLocs.n} locations`)

    // Remove bookings
    const deletedBookings = await db.Booking.deleteMany({})
    console.log(`Deleted ${deletedBookings.n} bookings`)

    // hash passwords
    const newUserSeed = userSeed.map((user) => {
      return {
        ...user,
        password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
      }
    })
    console.log(`Passwords hashed`)

    // Create new users
    const newUsers = await db.User.create(newUserSeed)
    console.log(`Created ${newUsers.length} new users`)

    // Create new organization
    const newOrgs = await db.Organization.create(orgSeed)
    console.log(`Created ${newOrgs.length} new orgs`)

    // Create locations, associate with new org
    const newLocSeed = locSeed.map((loc) => {
      return {
        ...loc,
        organization: newOrgs[0]._id
      }
    })
    const newLocs = await db.Location.create(newLocSeed)
    console.log(`Created ${newLocs.length} new locations`)

    // Add first user and all locations to org's admin list
    const updatedAdminList = {
      admins: [newUsers[0]._id]
    }
    const updatedOrg = await db.Organization.findByIdAndUpdate(
      newOrgs[0]._id, updatedAdminList, {new: true}
    )
    console.log('Updated first org with new admin list')

    // Add org to all users list
    const updatedOrgList = {
      organizations: [updatedOrg._id]
    }
    for (let i = 0; i < newUsers.length; i++) {
      const user = newUsers[i];
      await db.User.findByIdAndUpdate(user._id, updatedOrgList, {new: true})
    }
    console.log('Update all users, adding first org to own list')

  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}

runSeedProcess()


// // Remove users
// db.User.deleteMany({}, async (err, result) => {
//   if (err) console.log(err)
//   console.log(`Deleted ${result.n} users.`)
//   // Create new users
//   db.User.create(userSeed, (err, newUsers) => {
//     if (err) console.log(err)
//     console.log(`Created ${newUsers.length} new users`)




//     process.exit()
//   })

  
// })