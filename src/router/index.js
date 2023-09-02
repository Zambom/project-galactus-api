const { Router } = require('express')

const galaxies = require('./galaxy')
const stars = require('./starsystem')
const planets = require('./planet')

const router = Router()

router.get('/', async (req, res) => {
    res.send('Hello there!')
})
router.use('/galaxies', galaxies)
router.use('/star-systems', stars)
router.use('/planets', planets)


module.exports = router