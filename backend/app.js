const express = require('express');
const cors = require('cors');
const path = require('path');
const matchRoutes = require('./routes/match.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API Routes
app.use('/api', matchRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Talent Matchmaker API is running' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API: http://localhost:${PORT}/api`);
  console.log(`Frontend: http://localhost:${PORT}`);
});
