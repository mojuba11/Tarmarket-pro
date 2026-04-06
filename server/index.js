const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// 1. Connect to MongoDB
connectDB();

// 2. Global Middleware
app.use(cors()); // Allows your React frontend to talk to this API
app.use(express.json({ extended: false })); // Replaces body-parser for JSON data

// 3. Security: Rate Limiting
// Prevents brute-force attacks on your login and withdrawal endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use('/api/', apiLimiter);

// 4. API Routes Wiring
// These link the URL paths to your specific route files
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/campaigns', require('./src/routes/campaignRoutes'));
app.use('/api/tasks', require('./src/routes/taskRoutes'));

// 5. Global Error Handling Middleware
// This catches any unhandled errors and prevents the server from crashing
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 6. Handle 404 (Route Not Found)
app.use((req, res) => {
  res.status(404).json({ message: "Resource not found on Tarmarket Server" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  -------------------------------------------
  🚀 TARMARKET SERVER STARTING...
  📡 Port: ${PORT}
  🌍 Environment: ${process.env.NODE_ENV || 'development'}
  -------------------------------------------
  `);
});