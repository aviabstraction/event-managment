
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  _id: Number,
  category: { type: String, required: true },
  description: String,
  imageUrl: String,
  backgroundColor: String,
});

const category = mongoose.model('category', eventSchema);

export default category;