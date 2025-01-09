const {
  getAll,
  getById,
  createTool,
  updateById,
  deleteById,
} = require("../controllers/tool.controller");

const router = require("express").Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createTool);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
