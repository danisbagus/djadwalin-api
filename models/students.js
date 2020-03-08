"use strict";
module.exports = (sequelize, DataTypes) => {
  const students = sequelize.define(
    "students",
    {
      nrp: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      alamat: DataTypes.STRING
    },
    {}
  );
  students.associate = function(models) {
    // associations can be defined here
  };
  return students;
};
