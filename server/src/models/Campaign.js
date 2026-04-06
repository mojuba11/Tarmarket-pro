const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  influencerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoUrl: { type: String, required: true },
  platform: { type: String, enum: ['youtube', 'tiktok', 'instagram'], required: true },
  totalBudget: { type: Number, required: true },
  remainingBudget: { type: Number, required: true },
  costPerAction: { type: Number, default: 0.50 }, // What the worker earns per task
  status: { type: String, enum: ['active', 'paused', 'completed'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', CampaignSchema);