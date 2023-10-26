// routes/stock.js
const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');

// Route for the stock view
router.get('/stock', async (req, res) => {
  try {
    // Fetch assets in stock (you need to adjust the condition based on your data structure)
    const stockAssets = await Asset.findAll({ where: { status: 'In Stock' } });

    // Calculate totals by branch
    const branchTotals = {};
    stockAssets.forEach((asset) => {
      const branch = asset.branch; // Assuming each asset has a "branch" attribute
      if (branchTotals[branch]) {
        branchTotals[branch]++;
      } else {
        branchTotals[branch] = 1;
      }
    });

    // Calculate the total value
    const totalValue = stockAssets.reduce((acc, asset) => acc + asset.value, 0);

    res.render('stock/view', { stockAssets, branchTotals, totalValue });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching stock data');
  }
});

module.exports = router;
