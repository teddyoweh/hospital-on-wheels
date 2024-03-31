require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const nursesRoutes = require('./routes/nurses.routes');
const baseRoutes = require('./routes/base.routes');
const cors = require('cors');  

const app = express();
const PORT = process.env.PORT || 9990;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.use(cors());
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Bison Bytes' });
});

app.use('/nurses', nursesRoutes);
app.use('/auth', authRoutes);
app.use('/base', baseRoutes);

mongoose
  .connect('mongodb://localhost:27017/bisonbytes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
