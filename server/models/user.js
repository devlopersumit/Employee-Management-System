const mongoose = require('mongoose');
const { trim } = require('validator');
const department = require('./department');
// const { isEmail, isStrongPassword } = require('validator');

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
    trim:true
    // validate: [ isEmail, 'invalid email' ]
  },
  password:{
    type:String,
    required:true
    // validate: [isStrongPassword, 'Please Enter strong password']
  },
  role:{
    type:String,
    enum: ['ADMIN', 'MANAGER', 'EMPLOYEE'],
    default:'ADMIN'
  },
  department: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Department",
    default:null
  }
}, {
 timestamps: true
});

module.exports = mongoose.model('User', userSchema);