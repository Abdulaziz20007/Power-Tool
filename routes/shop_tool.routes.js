const {
  getAll,
  getById,
  createShopTool,
  updateById,
  deleteById,
} = require("../controllers/shop_tool.controller");

const router = require("express").Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createShopTool);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
