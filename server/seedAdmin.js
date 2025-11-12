const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/user");

async function seedUsers() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  const users = [
    { name: "Admin User", email: "admin@company.com", password: "admin123", role: "ADMIN" },
    { name: "Manager User", email: "manager@company.com", password: "manager123", role: "MANAGER" },
    { name: "Employee User", email: "employee@company.com", password: "employee123", role: "EMPLOYEE" },
  ];

  for (const userData of users) {
    const existing = await User.findOne({ email: userData.email });
    if (existing) {
      console.log(`❌ ${userData.email} already exists`);
      continue;
    }

    const hashed = await bcrypt.hash(userData.password, 10);
    await User.create({ ...userData, password: hashed });
    console.log(`✅ Created ${userData.role}`);
  }

  process.exit();
}

seedUsers();
