const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token:  { type: String, required: true, unique: true },
  lastUsedAt: { type: Date, default: Date.now },
});

// deletes doc after 30 days 
tokenSchema.index({ lastUsedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });

module.exports = model('Token', tokenSchema);