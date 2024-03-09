const TradeModel = require("../../models/Trade.model");
const portfolioModel = require("../../models/Portfolio.model");

const addTrade = async (req, res) => {
  const { trade } = req.body;
  try {
    const newTrade = await TradeModel.create(trade);
    const portfolio = await portfolioModel.findOne({ stock: trade.stock });
    if (portfolio) {
      portfolio.trades.push(newTrade._id);
      await portfolio.save();
    } else {
      await portfolioModel.create({
        stock: trade.stock,
        trades: [newTrade._id],
      });
    }
    res.status(200).send({success: true, response: newTrade});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = addTrade;
