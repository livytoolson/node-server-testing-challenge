const express = require('express')
const Candy = require('./candy-model');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const candyData = await Candy.find()
        candyData.forEach(candy => {
            candy.yummy = Boolean(candy.yummy)
        })
        res.status(200).json(candyData)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const candyData = await Candy.findById(id)
        if (!candyData) {
            res.status(404).json(`Candy with id ${id} does not exist`)
        } else {
            candyData.yummy = Boolean(candyData.yummy)
            res.status(200).json(candyData)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const newCandy = req.body
        const candyData = await Candy.create(newCandy)
        candyData.yummy = Boolean(candyData.yummy)
        res.status(200).json(candyData)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    // return updated object instead of number 
    try {
        const { id } = req.params
        const changes = req.body
        const candyData = await Candy.update(id, changes)
        res.status(200).json(candyData)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const candyData = await Candy.remove(id)
        if (!candyData) {
            res.status(404).json(`Candy with id ${id} does not exist`)
        } else {
            res.json('Candy was eaten')
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;