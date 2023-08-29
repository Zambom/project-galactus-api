const { Router } = require('express')
const GalaxyController = require('../controllers/galaxy')

const controller= new GalaxyController()

const router = Router()

router.get('/', async (req, res) => {
    try {
        const instances = await controller.List()

        res.status(200).send({ data: instances })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router