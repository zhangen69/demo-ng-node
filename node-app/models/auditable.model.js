const mongoose = require('mongoose');

const schema = mongoose.Schema({
    audit: {
        createdBy: { type: String, default: null },
        createdDate: { type: Date, default: Date.now },
        updatedBy: { type: String, default: null },
        updatedDate: { type: Date, default: Date.now },
    }
});

module.exports = schema;  