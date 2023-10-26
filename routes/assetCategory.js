// routes/assetCategory.js
const express = require('express');
const router = express.Router();
const AssetCategory = require('../models/AssetCategory');

// Route for listing asset categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await AssetCategory.findAll();
    res.render('category/list', { categories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching asset categories');
  }
});

// Route for adding a new asset category
router.get('/categories/add', (req, res) => {
  res.render('category/add');
});

router.post('/categories/add', async (req, res) => {
  try {
    const { name, description } = req.body;
    await AssetCategory.create({ name, description });
    res.redirect('/categories');
  } catch (error) {
    console.error(error);
    res.status(400).send('Error adding asset category');
  }
});

// Route for editing an asset category
router.get('/categories/edit/:id', async (req, res) => {
  const id = req.params.id;
  const category = await AssetCategory.findByPk(id);
  if (category) {
    res.render('category/edit', { category });
  } else {
    res.status(404).send('Asset category not found');
  }
});

router.post('/categories/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const category = await AssetCategory.findByPk(id);
    if (category) {
      category.name = name;
      category.description = description;
      await category.save();
      res.redirect('/categories');
    } else {
      res.status(404).send('Asset category not found');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send('Error editing asset category');
  }
});

module.exports = router;
