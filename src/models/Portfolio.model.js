const mongoose = require('mongoose');

const Portfolio = mongoose.model('Portfolio', new mongoose.Schema({
  stock: String,
  trades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trade' }]
}));

module.exports = Portfolio;
