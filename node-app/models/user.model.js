const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    displayName: { type: String, default: null },
    email: { type: String, default: null },
    emailConfirmed: { type: Boolean, default: false },
    phone: { type: String, default: null },
    avatarImageUrl: { type: String, default: null },
    signatureImageUrl: { type: String, default: null },
    lastLoggedIn: { type: Date, default: Date.now },
    forceLogout: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    isLocked: { type: Boolean, default: false },
    isResetPasswordLocked: { type: Boolean, default: false },
    resetPasswordToken: { type: String, default: null },
    accessFailedCount: { type: Number, default: 0 },
    roles: { type: [String], default: [] }
});

schema.add(require('./auditable.model'));

module.exports = mongoose.model('User', schema);
