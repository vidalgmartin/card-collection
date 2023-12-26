const mongoose = require('mongoose')

// define the card model
const deckSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    cards: []
}, {timestamps: true })

// define and export the card model for the database
module.exports = mongoose.model('Deck', deckSchema)