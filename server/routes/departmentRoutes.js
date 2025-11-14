const express = require('express');
const { createDepartment, getDepartment, updateDepartment, deleteDepartment, getDepartmentById } = require('../controller/departmentController');
const adminAuth = require('../middleware/adminMiddleware');

const departmentRouter = express.Router();

//Create Department
departmentRouter.post('/', adminAuth, createDepartment);

//Get Department Details
departmentRouter.get('/', getDepartment);

//Get Department by Id
departmentRouter.get('/:id', getDepartmentById);

//Update Department Details
departmentRouter.put('/:id',adminAuth, updateDepartment);

//Delete Department
departmentRouter.delete('/:id',adminAuth, deleteDepartment);

module.exports = departmentRouter;