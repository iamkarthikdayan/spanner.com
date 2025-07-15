const express = require('express')
const userRouter = express.Router()
const user = require('../controllers/userController')


userRouter.post('/login', user.createUser);

userRouter.post('/update', user.updateUser);


module.exports = userRouter;