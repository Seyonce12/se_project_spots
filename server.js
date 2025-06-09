const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  bio: String,
  likes: [String],
  dislikes: [String],
}));

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('No token');
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hash });
  res.status(201).send(user);
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).send('Invalid credentials');
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
  res.send({ token });
});

// User profile
app.get('/api/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.send(user);
});

app.put('/api/me', authMiddleware, async (req, res) => {
  const { username, bio } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { username, bio }, { new: true });
  res.send(user);
});

// Likes/Dislikes
app.post('/api/like', authMiddleware, async (req, res) => {
  const { item } = req.body;
  const user = await User.findById(req.user.id);
  if (!user.likes.includes(item)) user.likes.push(item);
  await user.save();
  res.send(user);
});

app.post('/api/dislike', authMiddleware, async (req, res) => {
  const { item } = req.body;
  const user = await User.findById(req.user.id);
  if (!user.dislikes.includes(item)) user.dislikes.push(item);
  await user.save();
  res.send(user);
});

app.listen(4000, () => console.log('Server running on port 4000'));
