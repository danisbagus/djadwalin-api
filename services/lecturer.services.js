require("module-alias/register");
const { response } = require("@helpers");
const { sequelize, lecturers: Lecturer } = require("@models");

const lecturerService = {
  getAllLecturer: async (req, res) => {
    try {
      const lecturerData = await Lecturer.findAll({
        attributes: ["id", "nik", "nama", "alamat"]
      });
      return res
        .status(200)
        .json(response(true, "Sukses mendapatkan data dosen", lecturerData));
    } catch (error) {
      if (error.errors) {
        return res.status(400).json(response(false, error.errors));
      }
      return res.status(400).json(response(false, error.message));
    }
  },
  getLecturer: async (req, res) => {
    const { lecturer_id } = req.params;
    try {
      const lecturerData = await Lecturer.findOne({
        where: { id: lecturer_id }
      });
      if (!lecturerData) {
        return res.status(400).json(response(false, "ID tidak tersedia"));
      }
      return res
        .status(200)
        .json(response(true, "Sukses mendapatkan data dosen", lecturerData));
    } catch (error) {
      if (error.errors) {
        return res.status(400).json(response(false, error.errors));
      }
      return res.status(400).json(response(false, error.message));
    }
  },
  createLecturer: async (req, res) => {
    const { data } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const payload = {
        nik: data.nik,
        nama: data.nama,
        alamat: data.alamat
      };
      const lecturerData = await Lecturer.create(payload, { transaction });
      if (!lecturerData) {
        await transaction.rollback();
        return res
          .status(400)
          .json(response(false, "Gagal membuat data dosen"));
      }
      await transaction.commit();
      return res
        .status(200)
        .json(response(true, "berhasil membuat data dosen"));
    } catch (error) {
      await transaction.rollback();
      if (error.errors) {
        return res.status(400).json(response(false, error.errors));
      }
      return res.status(400).json(response(false, error.message));
    }
  },
  updateLecturer: async (req, res) => {
    const { lecturer_id } = req.params;
    const { data } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const payload = {
        nik: data.nik,
        nama: data.nama,
        alamat: data.alamat
      };
      const checkId = await Lecturer.findOne({
        where: { id: lecturer_id }
      });
      if (!checkId) {
        return res
          .status(400)
          .json(response(false, "id dosen tidak ditemukan"));
      }
      const lecturerData = await Lecturer.update(payload, {
        where: { id: lecturer_id },
        transaction
      });

      if (!lecturerData) {
        await transaction.rollback();
        return res
          .status(400)
          .json(response(false, "Gagal mengedit data dosen"));
      }
      await transaction.commit();
      return res.status(200).json(response(true, "berhasil memperbarui data"));
    } catch (errors) {
      await transaction.rollback();
      if (error.errors) {
        return res.status(400).json(response(false, error.errors));
      }
      return res.status(400).json(response(false, error.message));
    }
  },
  deleteLecturer: async (req, res) => {
    const { lecturer_id } = req.params;
    const transaction = await sequelize.transaction();
    try {
      const checkId = await Lecturer.findOne({
        where: { id: lecturer_id }
      });
      if (!checkId) {
        return res
          .status(400)
          .json(response(false, "id dosen tidak ditemukan"));
      }
      const lecturerData = await Lecturer.destroy({
        where: { id: lecturer_id },
        transaction
      });

      if (!lecturerData) {
        await transaction.rollback();
        return res
          .status(400)
          .json(response(false, "Gagal menghapus data dosen"));
      }
      await transaction.commit();
      return res.status(200).json(response(true, "berhasil menghapus data"));
    } catch (errors) {
      await transaction.rollback();
      if (error.errors) {
        return res.status(400).json(response(false, error.errors));
      }
      return res.status(400).json(response(false, error.message));
    }
  }
};

module.exports = lecturerService;
