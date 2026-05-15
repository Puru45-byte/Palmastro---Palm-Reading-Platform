require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Test auth route
app.post('/api/auth/test', (req, res) => {
  res.json({ message: 'Auth test working' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
