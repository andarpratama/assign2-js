const mongoose = require('mongoose')
const connectDB = () => {
   const pathURL = 'mongodb://localhost/assg2'
   const connectOption = { useNewUrlParser: true, useUnifiedTopology: true }
   mongoose.connect(pathURL, connectOption)

   // cecking mongodb
   const db = mongoose.connection
   db.on('error', console.error.bind(console, 'Connection error :'))
   db.once('open', () => console.log('Database connected..'))
}

module.exports = connectDB