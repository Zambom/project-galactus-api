const model = require('../models')
const { Sequelize } = require('sequelize') 

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
            const instance = model.sequelize.models.Galaxy.findByPk(id, {
                include: [
                    {
                        model: model.sequelize.models.StarSystem,
                        as: "star_systems",
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
            const instances = model.sequelize.models.Galaxy.findAll({
                attributes: {
                    include: [
                        [
                            Sequelize.fn("COUNT", Sequelize.col("star_systems.*")), "starsCount"
                        ]
                    ]
                },
                include: [
                    {
                        model: model.sequelize.models.StarSystem,
                        as: "star_systems",
                        attributes: []
                    }
                ],
                group: ['Galaxy.id']
            })

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

    async UpdateParameters(data) {
        try {
            console.log('data', data)
            const instances = model.sequelize.models.Galaxy.bulkCreate(
                data,
                {
                    updateOnDuplicate: ['parameters']
                }
            )

            return instances
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = GalaxyController