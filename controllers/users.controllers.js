const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.error('REGISTER_MISSING_FIELDS');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.error('REGISTER_INVALID_EMAIL');
        }

        const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!pwdRegex.test(password)) {
            return res.error('REGISTER_INVALID_PASSWORD');
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.error('REGISTER_DUPLICATE_EMAIL');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'Utilizador registado com sucesso!' });
    } catch (error) {
        console.error('Erro no registro:', error);
        return res.error('REGISTER_SERVER_ERROR');
    }
};

const login = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.error('LOGIN_MISSING_FIELDS');
  }

  try {
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { name: identifier }
      ]
    });

    if (!user) {
      return res.error('LOGIN_USER_NOT_FOUND');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.error('LOGIN_INVALID_CREDENTIALS');
    }

    const payload = { userId: user._id, type: user.type };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_SECRET_EXPIRES_IN,
    });

    return res.status(200).json({
      id: user._id,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.error('LOGIN_SERVER_ERROR');
  }
};


const getUserHabits = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('associatedhabits');

    if (!user) {
      return res.error('USER_NOT_FOUND');
    }

    return res.status(200).json({ habits: user.associatedhabits });
  } catch (err) {
    console.error(err);
    return res.error('USER_GET_HABITS_FAILED');
  }
};


module.exports = {
    login,
    register,
    getUserHabits
};
