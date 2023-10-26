// routes/returnAsset.js
const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');
const Employee = require('../models/employee');

// Route to return an asset
router.get('/return', async (req, res) => {
  try {
    const employees = await Employee.findAll(); // Get a list of all employees
    const assets = await Asset.findAll({ where: { status: 'Issued' } }); // Get assets currently issued

    res.render('return/return', { employees, assets });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading return form');
  }
});

// Route to handle the return form submission
router.post('/return', async (req, res) => {
  try {
    const assetId = req.body.assetId;
    const employeeId = req.body.employeeId;
    const reason = req.body.reason;

    // Update the asset status to 'In Stock' and clear the association with the employee
    await Asset.update({ status: 'In Stock', EmployeeId: null }, { where: { id: assetId } });

    // Store the reason for return in a separate history or log table
    // You may need to create a separate model for this and handle the insertion accordingly.

    res.redirect('/stock'); // Redirect to the stock view or another relevant page
  } catch (error) {
    console.error(error);
    res.status(500).send('Error returning asset');
  }
});

module.exports = router;
