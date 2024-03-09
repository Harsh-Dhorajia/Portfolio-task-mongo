const TradeModel = require("../../models/Trade.model");
const PortfolioModel = require("../../models/Portfolio.model");

const deleteTrade = async (req, res) => {
  const tradeId = req.params.tradeId;
  try {
    const trade = await TradeModel.findById(tradeId);
    if (!trade) throw new Error("Trade not found");

    await PortfolioModel.findOneAndUpdate(
      { stock: trade.stock },
      { $pull: { trades: tradeId } }
    );
    await TradeModel.findByIdAndDelete(tradeId);

    res.status(200).send({success: true, response: null});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteTrade;
