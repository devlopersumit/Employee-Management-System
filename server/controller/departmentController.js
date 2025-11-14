const department = require("../models/department");
const Department = require("../models/department");


// Create Department
const createDepartment = async (req, res) => {
    const { name, code, description } = req.body;

    try{
        if (!name || !code) {
      return res.status(400).json({ success: false, message: "Name and code required" });
      }

       const exist = await Department.findOne({ $or: [{ name }, { code }] });

       if (exist) { 
       return res.status(409).json({ success: false, message: "Department name or code already exists" });
         }

        const newDepartment = await Department.create({name, code, description});
        
        res.status(201).json({
            success:true,
            message:'Department Created successfully',
            department: newDepartment
        });
    }catch(err) {
        res.status(500).json({message:err.message});
    }
};

// Get Department Details
const getDepartment = async (req, res) => {
    try{
        const departments = await Department.find();
        res.status(200).json({departments});
    }catch(err) {
        res.status(500).json({message:err.message});
    }
};

//Get Single Department
const getDepartmentById = async (req, res) => {
    try{
        const dept = await Department.findById(req.params.id);
        if(!dept) {
            return res.status(404).json({
                success:false,
                message:'Department not found'
            })
        }

        res.json({success:true, department:dept});
    }catch(err) {
        res.status(500).json({
            success:false,
            message:"Srver Error" || err.message
        })
    }
};


//Update Department
const updateDepartment = async (req, res) => {
    const departmentId = req.params.id;
    const { name, code, description } = req.body;

    try{
        const department = await Department.findOne({departmentId});

        if(!department){
          return res.status(404).json({message:'Department not found!'});
        }
 
        const departments = {};
        if(name) departments.name = name;
        if(code) departments.code = code;
        if(description) departments.description = description;

        const updatedDepartment = await Department.findByIdAndUpdate({departmentId, departments});

        res.status(200).json({
            success:true,
            message:'Department updated successfully',
            department:updatedDepartment
        });
    }catch(err) {
        res.status(500).json({message:err.message || 'Something went wrong'});
    }
};

// Delete Department
const deleteDepartment = async (req, res) => {
    const departmentId = req.params.id;

    try{
        const department = await Department.findOne({departmentId});

        if(!department) {
           return res.status(404).json({message:'department does not exist'});
        }

        const deletedDepartment = await Department.findByIdAndDelete({departmentId});

        res.status(200).json({message:'Department Deleted Succesfully'});
    }catch(err){
        res.status(500).json({message:err.message || 'Something went wrong'});
    }
};


module.exports = {
    createDepartment,
    getDepartment,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};