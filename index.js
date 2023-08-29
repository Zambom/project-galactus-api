const setApp = require('./src')

setApp.then((app) => {
    app.listen(process.env.PORT || 3001, () => console.info('Server running.'))
}).catch((error) => {
    console.error(error)
    process.exit(1)
})