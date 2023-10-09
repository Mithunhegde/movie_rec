// controllers/user.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Movie=require('../models/Movie');
const config = require('../config/config');

// User registration controller
async function registerUser(req, res) {
  try {
    const { username, password } = req.body;


    // Hash the user's password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Registration failed' });
  }
}

// User login controller
async function login(req, res) {
  try {
    const { username, password } = req.body;

    console.log("username is" + username);
    console.log("username is" + password);
    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: '24h', // Token expiration time
    });

    res.json({ "status":"ok",token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
}

async function getMovies(req, res){
  console.log("body is" +req.body);

  try{
    const movie=await Movie.findAll({ where: { id:1 } });
    console.log("movie is", movie);
    res.status(201).json(req.body);
  }
  catch(err){
    console.log(err)
  }

  
}

module.exports = {
  registerUser,
  login,
  getMovies
};
