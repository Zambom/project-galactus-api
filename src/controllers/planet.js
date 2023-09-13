const { Sequelize, Op } = require('sequelize')
const model = require('../models')
const processFile = require('../services/csvprocesser')

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

    async List(conditions) {
        try {
            const instances = await model.sequelize.models.Planet.findAll({
                where: conditions
            })

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

    async UpdateParameters(data) {
        try {
            console.log('data', data)
            const instances = model.sequelize.models.Planet.bulkCreate(
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
            const headers = ["name", "galaxy", "star", "description", "input", "output", "article", "page"]

            const records = await processFile(filename, headers)

            const stars = Array.from(new Set(records.map(el => `${el.star} - ${el.galaxy}`)))

            const stars_ids = await model.sequelize.models.StarSystem.findAll({
                attributes: [
                    [Sequelize.fn('MIN', Sequelize.col('StarSystem.id')), 'id'],
                    [Sequelize.fn('CONCAT', Sequelize.col("StarSystem.name"), ' - ', Sequelize.col("galaxy.name")), 'star']
                ],
                group: 'star',
                where: Sequelize.where(
                    Sequelize.fn('CONCAT', Sequelize.col("StarSystem.name"), ' - ', Sequelize.col("galaxy.name")), {
                        [Op.in]:  stars
                    }
                ),
                include: [
                    {
                        model: model.sequelize.models.Galaxy,
                        as: "galaxy",
                        attributes: []
                    }
                ],
                raw: true
            })
            
            const data = records.map(el => {
                return {
                    name: el.name,
                    description: el.description,
                    article: el.article,
                    page: el.page,
                    star_id: stars_ids.filter(e => e.star === `${el.star} - ${el.galaxy}`)[0].id
                }
            })
            
            const instances = model.sequelize.models.Planet.bulkCreate(
                data
            )
            
            return instances
        } catch (error) {
            console.error("Something went wrong: ", error.message)
        }
    }
}

module.exports = PlanetController