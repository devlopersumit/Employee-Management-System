const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

router.post('/login',async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!email) {
            return res.status(400).json({message:'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(400).json({message:'invalid paasword'});
        }

        res.json({success:true,
            message:'Login Succesful',
            name:user.name,
            role:user.role
        });
    }catch(err) {
        console.log(err);
        res.status(500).json({success:false, message:'Server error'})
    }
});

module.exports = router;