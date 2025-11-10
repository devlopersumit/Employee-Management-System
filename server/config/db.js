const { default: mongoose } = require('mongoose');
const express = require('mongoose');

const connectDB = async () => {
    try{
     await mongoose.connect(process.env.MONGODB_URI)
     console.log("✅Mongo DB connected Succesfully...");
    }catch(err) {
        console.log("Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;