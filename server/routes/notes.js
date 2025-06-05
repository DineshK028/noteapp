import express from 'express';
import Note from '../models/Note.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all notes
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching notes' });
  }
});

// Create note
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, important } = req.body;
    const note = await Note.create({
      title,
      description,
      important,
      userId: req.user.id
    });
    res.status(201).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating note' });
  }
});

// Update note
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, important } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, description, important },
      { new: true }
    );
    
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    
    res.json({ success: true, note });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating note' });
  }
});

// Delete note
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    
    res.json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting note' });
  }
});

export default router; 