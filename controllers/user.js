// controllers/user.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Movie=require('../models/Movie');
const config = require('../config/config');
const { spawn } = require('child_process');
const fs = require('fs');
const { Sequelize } = require('sequelize');

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

  const userInput = req.body;
  let arr_json = '';

  const pythonProcess = spawn('python3', ['similarityscript.py', userInput.description]);

  pythonProcess.stdout.on('data', (data) => {
    arr_json = data.toString().trim();
    try {

      const idArray = JSON.parse(arr_json);
      console.log('Received data from Python:',idArray);
      // Further processing of 'idArray'
      Movie.findAll({
        attributes: ['poster'], // Replace with the column you want to retrieve
        where: {
          id: idArray, // Replace with the actual column name
        },
      })
      .then((results) => {
        // Extract values from the results
        const equivalentColumnValues = results.map((result) => result.poster);
    
        // Now, 'equivalentColumnValues' contains an array of values from the 'columnNameToSearch' column
        console.log("equivalent values",equivalentColumnValues);
        res.json({ equivalentColumnValues });
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle any errors here
      });

    } catch (error) {
      console.error('Error parsing JSON:', error.message);
      return;
    }
  });

  pythonProcess.on('error', (error) => {
    console.error('Python script execution error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  });

  pythonProcess.on('exit', (code) => {
    console.log(`Python script exited with code ${code}`);
    // Handle the script exit, if needed
  });
  


}

module.exports = {
  registerUser,
  login,
  getMovies
};
