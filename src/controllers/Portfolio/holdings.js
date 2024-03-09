const Portfolio = require("../../models/Portfolio.model");

const holdingsController = async (req, res) => {
  try {
    const holdings = await Portfolio.aggregate([
      {
        $lookup: {
          from: "trades",
          localField: "trades",
          foreignField: "_id",
          as: "trades",
        },
      },
      {
        $unwind: "$trades",
      },
      {
        $group: {
          _id: "$stock",
          quantity: {
            $sum: {
              $cond: [
                { $eq: ["$trades.type", "BUY"] },
                "$trades.quantity",
                { $multiply: ["$trades.quantity", -1] },
              ],
            },
          },
          totalCost: {
            $sum: { $multiply: ["$trades.quantity", "$trades.price"] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          stock: "$_id",
          quantity: 1,
          totalCost: 1,
          averagePrice: { $divide: ["$totalCost", "$quantity"] },
        },
      },
    ]);

    res.json({success: true, response: holdings});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = holdingsController;
