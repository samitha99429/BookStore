const User = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


const registerUser = async (req, res) => {
    const { firstname, lastname, email,phonenumber, password } = req.body;  
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'User already exists' });
  
    
      const user = new User({ firstname, lastname, email, phonenumber, password });
      await user.save();
  
      res.status(201).json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phonenumber: user.phonenumber,
        token: generateToken(user._id),
      });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  };
  


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = { registerUser, loginUser };
