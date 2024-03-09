const TradeModel = require("../../models/Trade.model");

const updateTrade = async (req, res) => {
  const trade = req.body.trade;
  try {
    await TradeModel.findByIdAndUpdate(req.params.tradeId, trade);
    res.status(200).send("Trade updated successfully");
    res.json({ success: true, response: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateTrade;
