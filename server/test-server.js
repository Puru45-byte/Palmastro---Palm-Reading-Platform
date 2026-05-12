require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log('Visit http://localhost:' + PORT + '/test to check');
});
