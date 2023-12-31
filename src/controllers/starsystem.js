const model = require('../models')
const { Sequelize } = require('sequelize')
const processFile = require('../services/csvprocesser')

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

    async List(conditions) {
        try {
            const instances = await model.sequelize.models.StarSystem.findAll({
                where: conditions,
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

    async UpdateParameters(data) {
        try {
            console.log('data', data)
            const instances = model.sequelize.models.StarSystem.bulkCreate(
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

    async batchInsert(filename) {
        try {
            const headers = ["name", "galaxy", "description"]

            const records = await processFile(filename, headers)

            const galaxies = Array.from(new Set(records.map(el => el.galaxy)))

            const galaxies_ids = await model.sequelize.models.Galaxy.findAll({
                attributes: [
                    [Sequelize.fn('MIN', Sequelize.col('id')), 'id'],
                    'name'
                ],
                group: 'name',
                where: {
                    name: galaxies
                }
            })

            const data = records.map(el => {
                return {
                    name: el.name,
                    description: el.description,
                    galaxy_id: galaxies_ids.filter(e => e.name === el.galaxy)[0].id
                }
            })
            
            const instances = model.sequelize.models.StarSystem.bulkCreate(
                data
            )
            
            return instances
        } catch (error) {
            console.error("Something went wrong: ", error.message)
        }
    }
}

module.exports = StarSystemController