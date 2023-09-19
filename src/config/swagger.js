const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Project Galactus API",
            version: "0.0.1",
            description: "Essa é uma API para gerenciamento de informações de modelos de IA gerativa, servindo como fonte de dados para o Project Galactus.",
        }
    },
    apis: ["./src/router/*.js", "./src/models/*.js"]
}

module.exports = options