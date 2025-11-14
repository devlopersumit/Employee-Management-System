const express = require('express');
const { addUser, getUsers, updateUser, deleteUser, getUserById } = require('../controller/userController');
const adminAuth = require('../middleware/adminMiddleware');

const userRouter = express.Router();

//Create User
userRouter.post('/',adminAuth, addUser);

//Get Users
userRouter.get('/', getUsers);

//Get user by Id
userRouter.get('/:id', getUserById);

//Update User
userRouter.put('/:id', adminAuth, updateUser);

//Delete User
userRouter.delete('/:id', adminAuth, deleteUser);

module.exports = userRouter;