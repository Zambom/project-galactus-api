'use strict';
const {
  Model
} = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *    StarSystem:
 *      type: object
 *      description: Representação das subcategorias da taxonomia dos modelos de IA gerativa.
 *      required:
 *        - name
 *        - description
 *        - galaxy_id
 *      properties:
 *        id:
 *          type: integer
 *          description: Identificador auto gerado da subcategoria
 *        name:
 *          type: string
 *          description: Nome da subcategoria
 *        description:
 *          type: string
 *          description: Breve descrição do que a subcategoria representa
 *        galaxy_id:
 *          type: integer
 *          description: Identificador da categoria onde essa subcategoria está inserida
 *        parameters:
 *          type: string
 *          description: Parâmetros utilizados para renderização do objeto 3D que representa essa subcategoria na aplicação
 *        createdAt:
 *          type: string
 *          format: datetime
 *          description: Data de cadastro
 *        updatedAt:
 *          type: string
 *          format: datetime
 *          description: Data da última atualização
 */
module.exports = (sequelize, DataTypes) => {
  class StarSystem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Galaxy, {
        foreignKey: "galaxy_id",
        as: "galaxy"
      })

      this.hasMany(models.Planet, {
        foreignKey: "star_id",
        as: "planets"
      })
    }
  }
  StarSystem.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    parameters: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StarSystem',
  });
  return StarSystem;
};