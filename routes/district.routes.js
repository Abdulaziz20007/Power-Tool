const {
  getAll,
  getById,
  createDistrict,
  updateById,
  deleteById,
} = require("../controllers/district.controller");

const router = require("express").Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createDistrict);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
