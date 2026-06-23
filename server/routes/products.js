const express = require('express');
const Product = require('../models/Product');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// GET all visible products
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    let query = { isVisible: true };
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isVisible) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST add product (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, description, price, category, isFeatured, isVisible } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
      category,
      isFeatured,
      isVisible
    });
    
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update product (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE product (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
