import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ name, email, password, role });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie('userId', user._id, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare entered password with stored password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie('userId', user._id, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.json({
      message: 'User logged in successfully',
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    console.log('hahaha');
    
    // Delete the token and any other cookies you might have set
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });
    res.clearCookie('userId', { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });

    // Send a response indicating the user has been logged out
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'An error occurred during logout' });
  }
}
