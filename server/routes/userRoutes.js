const express = require('express');
const { addUser, getUsers, updateUser, deleteUser } = require('../controller/userController');
const adminAuth = require('../middleware/adminMiddleware');

const userRouter = express.Router();

//Create User
userRouter.post('/',adminAuth, addUser);

//Get Users
userRouter.get('/', adminAuth, getUsers);

//Update User
userRouter.put('/:id', adminAuth, updateUser);

//Delete User
userRouter.delete('/:id', adminAuth, deleteUser);

module.exports = userRouter;