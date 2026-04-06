const mongoose = require('mongoose');

const TaskSubmissionSchema = new mongoose.Schema({
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  proofData: { type: String }, // e.g., a unique code found in video or a screenshot URL
  status: { type: String, enum: ['processing', 'approved', 'rejected'], default: 'processing' }
});

module.exports = mongoose.model('TaskSubmission', TaskSubmissionSchema);