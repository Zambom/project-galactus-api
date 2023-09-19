'use strict';
const {
  Model
} = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *    Planet:
 *      type: object
 *      description: Representação dos modelos de IA gerativa.
 *      required:
 *        - name
 *        - description
 *        - star_id
 *      properties:
 *        id:
 *          type: integer
 *          description: Identificador auto gerado do modelo
 *        name:
 *          type: string
 *          description: Nome do modelo
 *        description:
 *          type: string
 *          description: Breve descrição do modelo
 *        article:
 *          type: string
 *          description: Link para o artigo do modelo
 *        page:
 *          type: string
 *          description: Link para a página do modelo
 *        star_id:
 *          type: integer
 *          description: Identificador da estrela (subcategoria) onde esse modelo está inserido
 *        parameters:
 *          type: string
 *          description: Parâmetros utilizados para renderização do objeto 3D que representa esse modelo na aplicação
 */
module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.StarSystem, {
        foreignKey: "star_id",
        as: "star_system"
      })
    }
  }
  Planet.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    article: DataTypes.STRING,
    page: DataTypes.STRING,
    parameters: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Planet',
  });
  return Planet;
};