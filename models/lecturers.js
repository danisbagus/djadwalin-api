"use strict";
module.exports = (sequelize, DataTypes) => {
  const lecturers = sequelize.define(
    "lecturers",
    {
      nik: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      alamat: DataTypes.STRING
    },
    {}
  );
  lecturers.associate = function(models) {
    // associations can be defined here
  };
  return lecturers;
};
