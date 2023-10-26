// routes/issueAsset.js
const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');
const Employee = require('../models/employee');

// Route to issue an asset
router.get('/issue', async (req, res) => {
  try {
    const assets = await Asset.findAll({ where: { status: 'In Stock' } }); // Get available assets
    const employees = await Employee.findAll(); // Get a list of all employees

    res.render('issue/issue', { assets, employees });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading issue form');
  }
});

// Route to handle the issuance form submission
router.post('/issue', async (req, res) => {
  try {
    const assetId = req.body.assetId;
    const employeeId = req.body.employeeId;

    // Update the asset status to 'Issued' and associate it with the selected employee
    await Asset.update({ status: 'Issued', EmployeeId: employeeId }, { where: { id: assetId } });

    res.redirect('/stock'); // Redirect to the stock view or another relevant page
  } catch (error) {
    console.error(error);
    res.status(500).send('Error issuing asset');
  }
});

module.exports = router;
