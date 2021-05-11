'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Notifications.init({
    topic: DataTypes.STRING,
    time: DataTypes.DATE,
    date: DataTypes.DATEONLY,
    message: DataTypes.STRING,
    userid: DataTypes.STRING,
    accepted:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  return Notifications;
};