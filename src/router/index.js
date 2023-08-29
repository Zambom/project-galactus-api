const { Router } = require('express')

const galaxies = require('./galaxy')

const router = Router()

router.get('/', async (req, res) => {
    res.send('Hello there!')
})
router.use('/categories', galaxies)


module.exports = router