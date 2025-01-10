const {
  getAll,
  getById,
  createOrder,
  updateById,
  deleteById,
} = require("../controllers/order.controller");

const router = require("express").Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createOrder);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
