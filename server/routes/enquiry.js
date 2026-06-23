const express = require('express');
const Enquiry = require('../models/Enquiry');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Submit enquiry (public)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ message: 'All fields required' });
    }
    
    const enquiry = new Enquiry({ name, phone, email, message });
    await enquiry.save();
    
    res.status(201).json({ message: 'Enquiry submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all enquiries (protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark as read
router.put('/:id/read', authMiddleware, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete enquiry
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
