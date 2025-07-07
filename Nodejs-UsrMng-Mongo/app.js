require('dotenv').config();
const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const session = require('express-session');
const connectDB = require('./server/config/db');

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS middleware
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

// Connect to Database
//connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Static Files??
app.use(express.static('public'));

// Express Session-Really needed?
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
}));

// API Routes
app.use('/api/customers', require('./server/routes/customer'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Start server
app.listen(port, () => {
  console.log(`✅ App listening on port ${port}`);
});
