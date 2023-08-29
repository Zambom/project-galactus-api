require('dotenv').config()

module.exports = {
    dev: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        dialect: "postgres",
        define: {
            timestamps: true
        }
    },
    prod: {
        use_env_variable: 'DATABASE_URL'
    }
}