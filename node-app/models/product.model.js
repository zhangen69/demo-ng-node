const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Product', schema);
