// server/src/controllers/campaignController.js
const Campaign = require('../models/Campaign');

exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ msg: 'Campaign not found' });
    }

    // SECURITY CHECK: Does this campaign belong to the user making the request?
    if (campaign.influencerId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized to delete this campaign' });
    }

    await campaign.deleteOne();
    res.json({ msg: 'Campaign removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};