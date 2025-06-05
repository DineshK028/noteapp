import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  important: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Note', noteSchema); 