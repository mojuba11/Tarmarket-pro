const User = require('../models/User');
const Campaign = require('../models/Campaign');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

exports.completeTask = async (req, res) => {
  const { workerId, campaignId } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const campaign = await Campaign.findById(campaignId).session(session);
    
    if (campaign.remainingBudget < campaign.costPerAction) {
      throw new Error('Campaign budget exhausted');
    }

    // 1. Deduct from Campaign Budget
    campaign.remainingBudget -= campaign.costPerAction;
    await campaign.save({ session });

    // 2. Create Transaction Record for Worker
    const newTransaction = new Transaction({
      userId: workerId,
      amount: campaign.costPerAction,
      type: 'task_reward',
      status: 'completed',
      referenceId: campaignId
    });
    await newTransaction.save({ session });

    // 3. Update Worker's Wallet Balance
    await User.findByIdAndUpdate(workerId, {
      $inc: { 'wallet.balance': campaign.costPerAction }
    }).session(session);

    await session.commitTransaction();
    res.json({ msg: 'Task approved and funds credited!' });

  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};