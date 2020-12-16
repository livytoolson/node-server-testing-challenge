const express = require('express')
const Candy = require('./candy-model');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const candyData = await Candy.find()
        res.json(candyData)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.body
        const candyData = await Candy.findById(id)
        res.json(candyData)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const newCandy = req.body
        const candyData = await Candy.create(newCandy)
        res.json(candyData)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.body
        const changes = req.body
        const candyData = await Candy.update(id, changes)
        res.json(candyData)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.body
        await Candy.delete(id)
        res.json({ message: `Candy with ID ${id} was deleted` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;