// routes/assetHistory.js
const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');
const HistoryEvent = require('../models/HistoryEvent'); // You may need to create a model for history events

// Route to view asset history
router.get('/history/:assetId', async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const asset = await Asset.findByPk(assetId);

    if (!asset) {
      res.status(404).send('Asset not found');
      return;
    }

    // Fetch history events for the asset (you'll need to adapt this to your database structure)
    const historyEvents = await HistoryEvent.findAll({ where: { assetId } });

    res.render('history/history', { asset, historyEvents });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching asset history');
  }
});

module.exports = router;
