const {
  getAll,
  getById,
  createShop,
  updateById,
  deleteById,
} = require("../controllers/shop.controller");

const router = require("express").Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createShop);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
