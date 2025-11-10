const mongoose = require('mongoose');
const { isEmail, isStrongPassword } = require('validator');

const userSchema = mongoose.Schema({
  name:{
    type:String,
    minLength:3,
    maxLength:20
  },
  email:{
    type:String,
    unique:true,
    lowercase:true,
    validate: [ isEmail, 'invalid email' ]
  },
  password:{
    type:String,
    validate: [isStrongPassword, 'Please Enter strong password']
  },
  roel:{
    type:String,
    enum: ['admin', 'manager', 'employee'],
    default:'employee'
  },
}, {
 timestamps: true
});

module.exports = mongoose.model('User', userSchema);