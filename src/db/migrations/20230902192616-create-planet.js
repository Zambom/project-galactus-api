'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Planets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      article: {
        type: Sequelize.STRING,
        allowNull: true
      },
      page: {
        type: Sequelize.STRING,
        allowNull: true
      },
      parameters: {
        type: Sequelize.STRING,
        allowNull: true
      },
      star_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "StarSystems",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Planets');
  }
};