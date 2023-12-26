const mongoose = require('mongoose')

// define the card model
const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

// define and export the card model for the database
module.exports = mongoose.model('Card', cardSchema)