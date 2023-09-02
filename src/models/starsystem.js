'use strict';
const {
  Model
} = require('sequelize');
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