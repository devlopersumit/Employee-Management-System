const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/user");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const existingAdmin = await User.findOne({ email: "sumitsj2002@gmail.com" });

    if (existingAdmin) {
      console.log("❌ Admin already exists");
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash("Sumit@123", 10);

    const adminUser = new User({
      name: "SUmit Jha",
      email: "sumitsj2002@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit();
  }
}

createAdmin();
