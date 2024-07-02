const express = require('express');
const { login, register, getUserDetails } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.get('/me', authMiddleware, getUserDetails);

module.exports = userRouter;
