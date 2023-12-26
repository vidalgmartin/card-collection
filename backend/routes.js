const express = require('express')
const router = express.Router()
const Deck = require('./deckSchema')
const Card = require('./cardSchema')

// GET all decks
router.get('/decks', async (req, res) => {
    try {
        const decks = await Deck.find()
        res.json(decks)
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

// GET a deck
router.get('/decks/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deck = await Deck.findById(id)
        res.json(deck)
        if (!deck) {
            return res.status(404).json({ message: 'No such deck exists' })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Internal Server Error'})
    }

})

// POST a deck
router.post('/decks', async (req, res) => {
    const { title, format, cards } = req.body

    try {
        const createDeck = await Deck.create({ title, format, cards })
        res.status(200).json(createDeck)
      } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

// POST a card
router.post('/decks/:id', async (req, res) => {
    const { id } = req.params
    const { title, quantity } = req.body

    try {
        const deck = await Deck.findById(id)
        if (!deck) {
            return res.status(404).json({ message: 'No such deck exists' })
        }

        const createCard = await Card.create({ title, quantity })
        deck.cards.push(createCard)
        await deck.save()

        res.status(200).json(createCard)
      } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

// PATCH a deck
router.patch('/decks/:id', async (req, res) => {
    const { id } = req.params
    const updatedData = req.body

    try {
        const updateDeck = await Deck.findByIdAndUpdate(id, { ...updatedData })
        res.status(200).json(updateDeck)
        if (!updateDeck) {
            return res.status(404).json({ message: 'No such card exists' })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Internal Server Issues' })
    }
})

// DELETE a deck
router.delete('/decks/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deleteDeck = await Deck.findByIdAndDelete(id)
        res.json(deleteDeck)
        if (!deleteDeck) {
            return res.status(404).json({ message: 'No such card exists' })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

// export the routes
module.exports = router