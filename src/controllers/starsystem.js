const model = require('../models')

class StarSystemController {
    async Create(data) {
        try {
            const instance = await model.sequelize.models.StarSystem.Create({
                name: data.name,
                description: data.description,
                parameters: data.parameters,
                galaxy_id: data.galaxy_id
            })

            return instance
        } catch (error) {
            throw new Error(error)
        }
    }

    async Update(id, data) {
        try {
            const instance = await model.sequelize.models.StarSystem.Update(data, {
                where: { id }
            })

            return instance
        } catch (error) {
            throw new Error(error)
        }
    }

    async Get(id) {
        try {
            const instance = await model.sequelize.models.StarSystem.findByPk(id, {
                include: [
                    {
                        model: model.sequelize.models.Galaxy,
                        as: "galaxy"
                    }
                ]
            })

            return instance
        } catch (error) {
            throw new Error(error)
        }
    }

    async List() {
        try {
            const instances = await model.sequelize.models.StarSystem.findAll()

            return instances
        } catch (error) {
            throw new Error(error)
        }
    }

    async Delete(id) {
        try {
            const instance = await model.sequelize.models.StarSystem.destroy({
                where: { id }
            })

            return instance
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = StarSystemController