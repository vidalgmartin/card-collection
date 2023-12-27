const express = require('express')
const router = express.Router()
const Card = require('./cardSchema')
const Collection = require('./collectionSchema')

// GET all collections
router.get('/collections', async (req, res) => {
    try {
        const collections = await Collection.find()
        res.json(collections)
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

// GET a collection
router.get('/collections/:id', async (req, res) => {
    const { id } = req.params
    try {
        const collection = await Collection.findById(id)
        res.json(collection)
        if (!collection) {
            return res.status(404).json({ message: 'No such collection exists' })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Internal Server Error'})
    }

})

// POST a collection
router.post('/collections', async (req, res) => {
    const { title, description, cards } = req.body

    try {
        const createCollection = await Collection.create({ title, description, cards })
        res.status(200).json(createCollection)
      } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

// POST a card
router.post('/collections/:id', async (req, res) => {
    const { id } = req.params
    const { title, quantity } = req.body

    try {
        const collection = await Collection.findById(id)
        if (!collection) {
            return res.status(404).json({ message: 'No such collection exists' })
        }

        const createCard = await Card.create({ title, quantity })
        collection.cards.push(createCard)
        await collection.save()

        res.status(200).json(createCard)
      } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

// PATCH a collection
router.patch('/collections/:id', async (req, res) => {
    const { id } = req.params
    const updatedData = req.body

    try {
        const updateCollection = await Collection.findByIdAndUpdate(id, { ...updatedData })
        res.status(200).json(updateCollection)
        if (!updateCollection) {
            return res.status(404).json({ message: 'No such collection exists' })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Internal Server Issues' })
    }
})

// DELETE a collection
router.delete('/collections/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deleteCollection = await Collection.findByIdAndDelete(id)
        res.json(deleteCollection)

        if (!deleteCollection) {
            return res.status(404).json({ message: 'No such collection exists' })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

// DELETE a card
router.delete('/collections/:collectionId/:cardId', async (req, res) => {
    const { collectionId, cardId } = req.params

    try {
        const collection = await Collection.findById(collectionId)

        if (!collection) {
            return res.status(404).json({ message: 'No such collection exists' })
        }

        const cardIndex = collection.cards.findIndex((card) => card._id.toString() === cardId)

        if (cardIndex === -1) {
            return res.status(404).json({ message: 'No such card found in the collection' })
        }
        collection.cards.splice(cardIndex, 1);

        await collection.save();

        res.json({ message: 'Card deleted' });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

// export the routes
module.exports = router