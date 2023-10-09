// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
