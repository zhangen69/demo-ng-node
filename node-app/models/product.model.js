const mongoose = require('mongoose');
const auditable = require('./auditable.model');

const schema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  lastModified: { type: Date, default: Date.now },
});

schema.add(auditable);

module.exports = mongoose.model('Product', schema);
