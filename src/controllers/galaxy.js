const model = require('../models')

class GalaxyController {
    async Create(data) {
        try {
            const instance = model.sequelize.models.Galaxy.create({
                name: data.name,
                description: data.description,
                parameters: data.parameters
            })

            return instance
        } catch (error) {
            throw new Error(error)
        }
    }

    async Update(id, data) {
        try {
            const instance = model.sequelize.models.Galaxy.update(data, {
                where: { id }
            })

            return instance
        } catch (error) {
            throw new Error(error)
        }
    }

    async Get(id) {
        try {
            const instance = model.sequelize.models.Galaxy.findByPk(id)

            return instance
        } catch (error) {
            throw new Error(error)
        }
    }

    async List() {
        try {
            const instances = model.sequelize.models.Galaxy.findAll()

            return instances
        } catch (error) {
            throw new Error(error)
        }
    }

    async Delete(id) {
        try {
            const instance = model.sequelize.models.Galaxy.destroy({
                where: { id }
            })

            return instance
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = GalaxyController