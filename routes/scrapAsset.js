// routes/scrapAsset.js
const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');

// Route to scrap an asset
router.get('/scrap', async (req, res) => {
  try {
    const assets = await Asset.findAll(); // Get a list of all assets

    res.render('scrap/scrap', { assets });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading scrap form');
  }
});

// Route to handle the scrap form submission
router.post('/scrap', async (req, res) => {
  try {
    const assetId = req.body.assetId;

    // Mark the asset as obsolete (you may have a status field or similar)
    await Asset.update({ status: 'Obsolete' }, { where: { id: assetId } });

    res.redirect('/stock'); // Redirect to the stock view or another relevant page
  } catch (error) {
    console.error(error);
    res.status(500).send('Error scrapping asset');
  }
});

module.exports = router;
