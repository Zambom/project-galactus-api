const { Router } = require('express')

const galaxies = require('./galaxy')
const stars = require('./starsystem')

const router = Router()

router.get('/', async (req, res) => {
    res.send('Hello there!')
})
router.use('/galaxies', galaxies)
router.use('/star-systems', stars)


module.exports = router