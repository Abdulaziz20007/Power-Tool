const router = require("express").Router();
const clientRouter = require("./client.routes");
const toolRouter = require("./tool.routes");
const adminRouter = require("./admin.routes");
const ownerRouter = require("./owner.routes");
const districtRouter = require("./district.routes");
const shopRouter = require("./shop.routes");

router.use("/client", clientRouter);
router.use("/tool", toolRouter);
router.use("/admin", adminRouter);
router.use("/owner", ownerRouter);
router.use("/district", districtRouter);
router.use("/shop", shopRouter);

module.exports = router;
