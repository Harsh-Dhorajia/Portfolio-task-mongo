const express = require("express");
const {
  addTradeController,
  portfolioListController,
  holdingsController,
  getReturnsController,
  updateTradeController,
  deleteTradeController,
} = require("../controllers/Portfolio");
const router = express.Router();

router.route("/").get(portfolioListController);
router.route("/holdings").get(holdingsController);
router.route("/returns").get(getReturnsController);

router.route("/addTrade").post(addTradeController);
router.route("/update/:tradeId").post(updateTradeController);
router.route("/delete/:tradeId").delete(deleteTradeController);

module.exports = router;
