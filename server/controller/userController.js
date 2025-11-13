const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Add User
const addUser = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const existedEmail = await User.findOne({ email });
        if (existedEmail) {
            return res.status(400).json({ success: false, message: 'User already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ email, password: hashedPassword, role });
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: newUser
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, message: 'No users found' });
        }

        return res.status(200).json({
            success: true,
            users
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Update User
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { email, password, role } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const updateData = {};
        if (email) updateData.email = email;
        if (role) updateData.role = role;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        return res.status(200).json({ success: true, message: 'User updated', user: updatedUser });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};


//Delete User
const deleteUser = async (req, res) =>{
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const deletedUser = await User.findByIdAndDelete({userId});

        res.status(200).json({message:'user deleted successfully'});
    }catch(err) {
        res.status(500).json({message:err.message});
    }
};

module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUser
};