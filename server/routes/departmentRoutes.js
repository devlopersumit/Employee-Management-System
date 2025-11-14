const express = require('express');
const { createDepartment, getDepartment, updateDepartment, deleteDepartment } = require('../controller/departmentController');
const adminAuth = require('../middleware/adminMiddleware');

const departmentRouter = express.Router();

//Create Department
departmentRouter.post('/', adminAuth, createDepartment);

//Get Department Details
departmentRouter.get('/', adminAuth, getDepartment);

//Update Department Details
departmentRouter.put('/:id',adminAuth, updateDepartment);

//Delete Department
departmentRouter.delete('/:id',adminAuth, deleteDepartment);

module.exports = departmentRouter;