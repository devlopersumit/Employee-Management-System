const express = require('express');
const { addUser, getUsers, updateUser, deleteUser } = require('../controller/userController');

const userRouter = express.Router();

//Create User
userRouter.post('/user', addUser);

//Get Users
userRouter.get('/user', getUsers);

//Update User
userRouter.put('/user', updateUser);

//Delete User
userRouter.delete('/user', deleteUser);

module.exports = userRouter;