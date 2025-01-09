const {
  getAll,
  getById,
  createAdmin,
  updateById,
  deleteById,
} = require("../controllers/admin.controller");

const router = require("express").Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createAdmin);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
