require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: "Asia/Jakarta"
    },
    pool: {
      max: 50,
      min: 0,
      acquire: 1000000,
      idle: 10000
    },
    timezone: "Asia/Jakarta"
  }
};
