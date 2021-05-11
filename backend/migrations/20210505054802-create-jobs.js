'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      workingHours: {
        type: Sequelize.STRING
      },
      starttime: {
        type: Sequelize.STRING
      },
      finishtime: {
        type: Sequelize.STRING
      },
      startdate: {
        type: Sequelize.STRING
      },
      workingdays: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      postedby: {
        type: Sequelize.STRING
      },
      accepted:{
        type: Sequelize.STRING,
        defaultValue:0
      },
      acceptedby:{
        type: Sequelize.STRING,
        defaultValue:0
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jobs');
  }
};