const Portfolio = require("../../models/Portfolio.model");

// Retrieve the entire portfolio with trades
const fetchPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find().populate("trades");

    res.json({success: true, response: portfolio} );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = fetchPortfolio;
