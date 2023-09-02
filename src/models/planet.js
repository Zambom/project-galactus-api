'use strict';
const {
  Model
} = require('sequelize');
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