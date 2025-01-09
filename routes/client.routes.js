const {
  getAll,
  getById,
  createClient,
  updateById,
  deleteById,
} = require("../controllers/client.controller");

const router = require("express").Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createClient);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
