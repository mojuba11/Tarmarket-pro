// server/src/routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { deleteCampaign } = require('../controllers/campaignController');

// @route   DELETE api/campaigns/:id
// @desc    Delete a campaign
// @access  Private (Influencer only)
router.delete('/:id', auth, deleteCampaign);

module.exports = router;