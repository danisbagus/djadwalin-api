require("module-alias/register");
const { response } = require("@helpers");
const { sequelize, students: Student } = require("@models");

const studentService = {
  getAllStudent: async (req, res) => {
    try {
      const studentData = await Student.findAll({
        attributes: ["id", "nrp", "nama", "alamat"]
      });
      return res
        .status(200)
        .json(response(true, "Sukses mendapatkan data siswa", studentData));
    } catch (error) {
      if (error.errors) {
        return res.status(400).json(response(false, error.errors));
      }
      return res.status(400).json(response(false, error.message));
    }
  },
  getStudent: async (req, res) => {
    const { student_id } = req.params;
    try {
      const studentData = await Student.findOne({
        where: { id: student_id }
      });
      if (!studentData) {
        return res.status(400).json(response(false, "ID tidak tersedia"));
      }
      return res
        .status(200)
        .json(response(true, "Sukses mendapatkan data siswa", studentData));
    } catch (error) {
      if (error.errors) {
        return res.status(400).json(response(false, error.errors));
      }
      return res.status(400).json(response(false, error.message));
    }
  },
  createStudent: async (req, res) => {
    const { data } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const payload = {
        nrp: data.nrp,
        nama: data.nama,
        alamat: data.alamat
      };
      const studentData = await Student.create(payload, { transaction });
      if (!studentData) {
        await transaction.rollback();
        return res
          .status(400)
          .json(response(false, "Gagal membuat data siswa"));
      }
      await transaction.commit();
      return res
        .status(200)
        .json(response(true, "berhasil membuat data siswa"));
    } catch (error) {
      await transaction.rollback();
      if (error.errors) {
        return res.status(400).json(response(false, error.errors));
      }
      return res.status(400).json(response(false, error.message));
    }
  },
  updateStudent: async (req, res) => {
    const { student_id } = req.params;
    const { data } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const payload = {
        nrp: data.nrp,
        nama: data.nama,
        alamat: data.alamat
      };
      const checkId = await Student.findOne({
        where: { id: student_id }
      });
      if (!checkId) {
        return res
          .status(400)
          .json(response(false, "id siswa tidak ditemukan"));
      }
      const studentData = await Student.update(payload, {
        where: { id: student_id },
        transaction
      });

      if (!studentData) {
        await transaction.rollback();
        return res
          .status(400)
          .json(response(false, "Gagal mengedit data siswa"));
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
  deleteStudent: async (req, res) => {
    const { student_id } = req.params;
    const transaction = await sequelize.transaction();
    try {
      const checkId = await Student.findOne({
        where: { id: student_id }
      });
      if (!checkId) {
        return res
          .status(400)
          .json(response(false, "id siswa tidak ditemukan"));
      }
      const studentData = await Student.destroy({
        where: { id: student_id },
        transaction
      });

      if (!studentData) {
        await transaction.rollback();
        return res
          .status(400)
          .json(response(false, "Gagal menghapus data siswa"));
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

module.exports = studentService;
