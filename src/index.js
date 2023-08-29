const express = require('express')
const cors = require('cors')
const database = require('./config/database')
const router = require('./router')

const app = express()

const configExpress = () => {
    app.use(cors())
    app.use(express.json({ limit: '50mb' }))
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true, limit: '50mb' }))
    app.use('/', router)

    return app
}

module.exports = database.authenticate().then(configExpress)