const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGODB_DATABASE || 'library',
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Item schema (for both books and movies)
const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['book', 'movie'], required: true },
  description: { type: String },
  rating: { type: Number, min: 0, max: 10 },
  comments: [{ 
    text: { type: String }, 
    date: { type: Date, default: Date.now } 
  }],
  createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

// Routes
// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get item by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new item
app.post('/api/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update item
app.put('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add comment to item
app.post('/api/items/:id/comments', async (req, res) => {
  try {
    const { text } = req.body;
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { text } } },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update comment
app.put('/api/items/:id/comments/:commentId', async (req, res) => {
  try {
    const { text } = req.body;
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, 'comments._id': req.params.commentId },
      { $set: { 'comments.$.text': text } },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item or comment not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete comment
app.delete('/api/items/:id/comments/:commentId', async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { comments: { _id: req.params.commentId } } },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
