const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoutes = require('./routes/posts');
const communityRoutes = require('./routes/community')
const eventRoutes = require('./routes/event')
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/posts', postRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/communities', communityRoutes);
app.use('/api/events', eventRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Remove the image from the uploads folder (optional but recommended)
    const fs = require('fs');
    const imagePath = post.image.replace('/', '');
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));