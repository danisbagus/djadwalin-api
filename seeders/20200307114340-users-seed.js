"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("students", [
      {
        nrp: 915040006,
        nama: "Danis Bagus Setiawan",
        alamat: "Ngunut - Tulungagung",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nrp: 915040004,
        nama: "Sholahudin",
        alamat: "Sepuluh - Bangkalan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nrp: 915040021,
        nama: "Arry Agus Wahyudi",
        alamat: "Sedayu - Gresik",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("students", null, {});
  }
};
