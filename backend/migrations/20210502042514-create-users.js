'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      fullname: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING,
        allowNull:true
      },
      sex: {
        type: Sequelize.STRING,
        allowNull:true
      },
      contactNo: {
        type: Sequelize.BIGINT,
        allowNull:true
      },
      qualification: {
        type: Sequelize.STRING,
        allowNull:true
      },
      experience: {
        type: Sequelize.STRING,
        allowNull:true
      },
      affiliation: {
        type: Sequelize.STRING
      },
      webite: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.BIGINT
      },
      address: {
        type: Sequelize.STRING
      },
      type: {
        defaultValue: '0',
        type:Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};