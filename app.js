const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const connectDB = require('./configs/db')
const routes = require("./routes")
require('dotenv').config()
const generateResource = require('./controllers/generate.controller')

// connections database
connectDB()
generateResource()

// bodyParse
app.use(express.urlencoded({extended: true}))

// Home
app.get('/', (req, res) => res.json({msg: 'Welcome to the game..'}))

// route 
app.use(routes);
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`))
