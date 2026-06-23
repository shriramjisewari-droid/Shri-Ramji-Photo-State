const express = require('express');
const Gallery = require('../models/Gallery');

const router = express.Router();

// GET all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
