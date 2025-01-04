const bcrypt = require('bcrypt');
const { User } = require('../models'); // Sequelize model
const jwt = require('jsonwebtoken');

// Command handler to register a user
const registerUserHandler = async (email, password, confirmPassword) => {
  // Check if the passwords match
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  // Check if the email is already registered
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user in the database
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  return newUser;
};


// Command handler to log in a user
const loginUserHandler = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Email or password is incorrect');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log('pass', password, user.password, isPasswordValid);

  console.log('da sau nu:', isPasswordValid)
  
  if (!isPasswordValid) {
    throw new Error('Email or password is incorrect');
  }

  // Return success message instead of generating a token
  return { message: 'Login successful', user };
};


const registerUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  console.log('user:', req.body); // Log to inspect the received data

  try {
    // Check if passwords match
    const newUser = await registerUserHandler(email, password, confirmPassword);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to handle login

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Email or password is incorrect' });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Email or password is incorrect' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

    // Send token in the response
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};



// Controller to fetch current user details (logged-in user)
const getCurrentUser = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ email: user.email, id: user.id });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
};
