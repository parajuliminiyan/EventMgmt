'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  jobs.init({
    title: DataTypes.STRING,
    workingHours: DataTypes.STRING,
    starttime: DataTypes.STRING,
    finishtime: DataTypes.STRING,
    startdate:DataTypes.STRING,
    workingdays: DataTypes.STRING,
    description: DataTypes.TEXT,
    postedby: DataTypes.STRING,
    accepted: DataTypes.STRING,
    acceptedby:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'jobs',
  });
  return jobs;
};