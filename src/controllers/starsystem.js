const model = require('../models')
const { Sequelize } = require('sequelize')

class StarSystemController {
    async Create(data) {
        try {
            const instance = await model.sequelize.models.StarSystem.create({
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
            const instance = await model.sequelize.models.StarSystem.update(data, {
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
                        as: "galaxy",
                        attributes: ["id", "name"]
                    },
                    {
                        model: model.sequelize.models.Planet,
                        as: "planets",
                        attributes: ["id", "name", "parameters"]
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
            const instances = await model.sequelize.models.StarSystem.findAll({
                attributes: {
                    include: [
                        [
                            Sequelize.fn("COUNT", Sequelize.col("planets.*")), "planetsCount"
                        ]
                    ]
                },
                include: [
                    {
                        model: model.sequelize.models.Planet,
                        as: "planets",
                        attributes: []
                    }
                ],
                group: ['StarSystem.id']
            })

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