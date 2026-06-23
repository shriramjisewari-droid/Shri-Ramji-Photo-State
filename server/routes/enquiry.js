const express = require('express');
const Enquiry = require('../models/Enquiry');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// POST submit enquiry (public)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ error: 'All fields required' });
    }
    
    const enquiry = new Enquiry({ name, phone, email, message });
    await enquiry.save();
    
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all enquiries (protected)
router.get('/', verifyToken, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT mark as read (protected)
router.put('/:id/read', verifyToken, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE enquiry (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
