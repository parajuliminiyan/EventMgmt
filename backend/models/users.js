'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    age: DataTypes.STRING,
    sex: DataTypes.STRING,
    contactNo: DataTypes.BIGINT,
    qualification: DataTypes.STRING,
    experience: DataTypes.STRING,
    affiliation: DataTypes.STRING,
    webite: DataTypes.STRING,
    phoneNumber: DataTypes.BIGINT,
    address: DataTypes.STRING,
    type:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};