const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true }, // Negative for debits, Positive for credits
  type: { type: String, enum: ['deposit', 'withdrawal', 'task_reward', 'campaign_spend'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  referenceId: { type: String }, // e.g., Campaign ID or Bank Reference
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);