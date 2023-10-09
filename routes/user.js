// routes/user.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

// User registration route
router.post('/register', UserController.registerUser);
// User login route
router.post('/login', UserController.login);
router.post('/movies',UserController.getMovies);

module.exports = router;
