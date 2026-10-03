import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['pending','completed'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
