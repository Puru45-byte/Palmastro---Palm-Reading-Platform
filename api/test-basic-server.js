require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Basic auth test without Prisma
app.post('/api/auth/test', (req, res) => {
  res.json({ message: 'Auth test working' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Basic test server running on port ${PORT}`);
});
