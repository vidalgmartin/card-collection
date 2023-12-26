// import modules
const express = require('express')
const mongoose = require('mongoose')
const cardRoutes = require('./routes')

// dotenv environment variables
require('dotenv').config()

// initialize express
const app = express()

// middleware for parsing json in the request body
app.use(express.json())

// routes
app.use('/api', cardRoutes)

// connect to MongoDB atlas 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
            console.log('Helloge? connected to MongoDB')
        })
    .catch((error) => {
        console.log(error)
    })

// start listening for requests on the defined port
app.listen(process.env.PORT, () => {
    console.log('Helloge? server is running on port', process.env.PORT)
})
