const express = require('express');
const { createDepartment, getDepartment, updateDepartment, deleteDepartment } = require('../controller/departmentController');

const departmentRouter = express.Router();

//Create Department
departmentRouter.post('/department', createDepartment);

//Get Department Details
departmentRouter.get('/department', getDepartment);

//Update Department Details
departmentRouter.put('/department', updateDepartment);

//Delete Department
departmentRouter.delete('/department', deleteDepartment);

module.exports = departmentRouter;