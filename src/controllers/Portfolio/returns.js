const Portfolio = require("../../models/Portfolio.model");

const returnsController = async (req, res) => {
  try {
      // Assuming final price is 100 for all stocks for simplicity
      const holdings = await Portfolio.aggregate([
          {
              $lookup: {
                  from: 'trades',
                  localField: 'trades',
                  foreignField: '_id',
                  as: 'trades'
              }
          },
          {
              $unwind: '$trades'
          },
          {
              $group: {
                  _id: '$stock',
                  initialInvestment: {
                      $sum: {
                          $cond: [
                              { $eq: ['$trades.type', 'BUY'] },
                              { $multiply: ['$trades.quantity', '$trades.price'] },
                              { $multiply: ['$trades.quantity', '$trades.price', -1] }
                          ]
                      }
                  }
              }
          },
          {
              $project: {
                  _id: 0,
                  stock: '$_id',
                  initialInvestment: 1
              }
          }
      ]);

      const returns = holdings.map(holding => {
          const currentValuation = holding.quantity * 100; // Assuming final price is 100
          return {
              stock: holding.stock,
              return: (currentValuation - holding.initialInvestment) / holding.initialInvestment
          };
      });

      res.json({success: true, response: returns} );

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


module.exports = returnsController;
