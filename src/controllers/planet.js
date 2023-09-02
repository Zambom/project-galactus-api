const model = require('../models')

class PlanetController {
    async Create(data) {
        try {
            const instance = await model.sequelize.models.Planet.create({
                name: data.name,
                description: data.description,
                parameters: data.parameters,
                article: data.article,
                page: data.page,
                star_id: data.star_id
            })

            return instance
        } catch (error) {
            throw new Error(error)
        }
    }

    async Update(id, data) {
        try {
            const instance = await model.sequelize.models.Planet.update(data, {
                where: { id }
            })

            return instance
        } catch (error) {
            throw new Error(error)
        }
    }

    async Get(id) {
        try {
            const instance = await model.sequelize.models.Planet.findByPk(id, {
                include: [
                    {
                        model: model.sequelize.models.StarSystem,
                        as: "star_system"
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
            const instances = await model.sequelize.models.Planet.findAll()

            return instances
        } catch (error) {
            throw new Error(error)
        }
    }

    async Delete(id) {
        try {
            const instance = await model.sequelize.models.Planet.destroy({
                where: { id }
            })

            return instance
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = PlanetController