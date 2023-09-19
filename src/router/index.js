const { Router } = require('express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swagger = require('../config/swagger')

const galaxies = require('./galaxy')
const stars = require('./starsystem')
const planets = require('./planet')

const router = Router()
const specs = swaggerJsdoc(swagger)

router.get('/', swaggerUi.setup(specs))
router.use('/galaxies', galaxies)
router.use('/star-systems', stars)
router.use('/planets', planets)


module.exports = router