const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const zod = require('zod');

// Define validation schemas
const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  email: zod.string().email({ message: 'Invalid email' })
});

const signinSchema = zod.object({
  email: zod.string().email({ message: 'Invalid email' }),
  password: zod.string()
});

// User signup
const register = async (req, res) => {
  const parsedUser = signupSchema.safeParse(req.body);
  if (!parsedUser.success) {
    return res.status(400).json({ msg: 'Invalid inputs', errors: parsedUser.error.errors });
  }

  const { username, email, password } = parsedUser.data;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// User signin
const login = async (req, res) => {
  const parsedUser = signinSchema.safeParse(req.body);
  if (!parsedUser.success) {
    return res.status(400).json({ msg: 'Invalid inputs', errors: parsedUser.error.errors });
  }

  const { email, password } = parsedUser.data;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get user details
const getUserDetails = async (req, res) => {
  try {
      const user = req.user; // This should be populated by the auth middleware
      if (!user) {
          return res.status(404).json({ msg: 'User not found' });
      }
      res.status(200).json(user);
  } catch (err) {
      res.status(500).json({ msg: 'Server error' });
  }
};


module.exports = { register, login, getUserDetails };
