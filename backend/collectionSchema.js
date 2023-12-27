const mongoose = require('mongoose')

// define the card model
const collectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cards: []
}, {timestamps: true })

// define and export the card model for the database
module.exports = mongoose.model('Collection', collectionSchema)