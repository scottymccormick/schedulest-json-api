const mongoose = require('mongoose')

const connectionString = process.env.MONGO_URL

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

mongoose.connection.on('connected', () => {
  console.log(`Connected on ${connectionString}`)
})
mongoose.connection.on('error', (error) => {
  console.log(`Error: ${error}`)
})
mongoose.connection.on('disconnected', () => {
  console.log(`Disconnected from ${connectionString}`)
})