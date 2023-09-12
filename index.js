const setApp = require('./src')

global.__basedir = __dirname

setApp.then((app) => {
    app.listen(process.env.PORT || 3001, () => console.info('Server running.'))
}).catch((error) => {
    console.error(error)
    process.exit(1)
})