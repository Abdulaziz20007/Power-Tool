const {
  getAll,
  getById,
  createOwner,
  updateById,
  deleteById,
} = require("../controllers/owner.controller");

const router = require("express").Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createOwner);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
