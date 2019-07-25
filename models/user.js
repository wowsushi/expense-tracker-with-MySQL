'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    date: DataTypes.DATE,
    password: DataTypes.STRING,
    monthlyBudget: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Record)
  };
  return User;
};
