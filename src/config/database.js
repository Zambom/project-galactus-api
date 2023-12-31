const { Sequelize } = require('sequelize')
const env = process.env.NODE_ENV || 'dev'
const config = require('./config')[env]

let sequelize = null

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false,
        define: {
            timestamps: true
        }
    })
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        {
            host: config.host,
            dialect: config.dialect,
            port: config.port
        },
        config.define
    )
}

module.exports = sequelize