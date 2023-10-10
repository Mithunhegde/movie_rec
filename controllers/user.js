// controllers/user.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Movie=require('../models/Movie');
const config = require('../config/config');
const { exec } = require('child_process');

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
  var idArray;
  const userInput  = req.body;
  var listOfId=[];
  console.log("checking for user input",userInput.description);
  const pythonProcess = exec(`python similarityscript.py "${userInput.description}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    try {
      idArray = stdout
      console.log(idArray)
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError.message);
      return;
    }
  });

  pythonProcess.on('exit', (code) => {
    console.log(`Python script exited with code ${code}`);
  });

  
}

module.exports = {
  registerUser,
  login,
  getMovies
};
