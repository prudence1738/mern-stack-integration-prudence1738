require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use('/' + (process.env.UPLOAD_DIR || 'uploads'), express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/comments', require('./routes/comments'));

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
