const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/usercontroller');

// Register a new user
userRouter.post('/register', userController.createUser);

// User login
userRouter.post('/login', userController.userLogin);

// Update user details
userRouter.put('/update/:id', userController.updateUser);

// Get all users
userRouter.get('/all', userController.getAllUsers);

// Get all service providers
userRouter.get('/providers', userController.getAllProviders);

module.exports = userRouter;