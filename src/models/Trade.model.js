const mongoose = require('mongoose');

const Trade = mongoose.model('Trade', new mongoose.Schema({
  stock: String,
  type: { type: String, enum: ['BUY', 'SELL'] },
  quantity: Number,
  price: Number,
  date: Date
}));

module.exports = Trade;
