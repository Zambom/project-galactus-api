const { Router } = require('express')
const PlanetController = require('../controllers/planet')
const upload = require('../middlewares/upload')

const controller = new PlanetController()

const router = Router()

router.get('/', async (req, res) => {
    try {
        const { star_id } = req.query
        let conditions = {}

        if (star_id) {
            conditions = { star_id }
        }

        const instances = await controller.List(conditions)

        res.status(200).send({ data: instances })
    } catch (error) {
        res.status(500).send({ message: "Erro interno", error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const { 
            name, 
            description, 
            parameters, 
            article,
            page,
            star_id 
        } = req.body

        const instance = await controller.Create({ name, description, parameters, article, page, star_id })

        res.status(201).send({ data: instance })
    } catch (error) {
        res.status(500).send({ message: "Erro interno", error: error.message })
    }
})

router.post('/batch', upload.single('csv'), async (req, res) => {
    controller.batchInsert(`uploads/${req.file.filename}`)

    res.status(200).send({ message: 'Processo iniciado.' })
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const instance = await controller.Get(id)

        res.status(200).send({ data: instance })
    } catch (error) {
        res.status(500).send({ message: "Erro interno", error: error.message })
    }
})

router.put('/add-parameters', async (req, res) => {
    try {
        const { data } = req.body
        
        const instances = await controller.UpdateParameters(data)

        res.status(200).send({ data: instances })
    } catch (error) {
        res.status(500).send({ message: "Error interno", error: error.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const instance = await controller.Update(id, data)

        res.status(200).send({ data: instance })
    } catch (error) {
        res.status(500).send({ message: "Erro interno", error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        await controller.Delete(id)

        res.status(204).send()
    } catch (error) {
        res.status(500).send({ message: "Erro interno", error: error.message })
    }
})

module.exports = router