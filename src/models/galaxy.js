'use strict';
const {
  Model
} = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *    Galaxy:
 *      type: object
 *      description: Representação das categorias da taxonomia dos modelos de IA gerativa.
 *      required:
 *        - name
 *        - description
 *      properties:
 *        id:
 *          type: integer
 *          description: Identificador auto gerado da galáxia
 *        name:
 *          type: string
 *          description: Nome da galáxia
 *        description:
 *          type: string
 *          description: Breve descrição do que a galáxia representa
 *        parameters:
 *          type: string
 *          description: Parâmetros utilizados para renderização do objeto 3D que representa essa galáxia na aplicação
 */
module.exports = (sequelize, DataTypes) => {
  class Galaxy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.StarSystem, {
        foreignKey: "galaxy_id",
        as: "star_systems"
      })
    }
  }
  Galaxy.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    parameters: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Galaxy',
  });
  return Galaxy;
};