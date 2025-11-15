const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const router = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const departmentRouter = require('./routes/departmentRoutes');

const app = express();

// CORS Configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Database Connection
connectDB();

// Routes
app.use('/api', router);
app.use('/api/users', userRouter);
app.use('/api/departments', departmentRouter);

app.get('/', (req, res) => {
    res.send("Server is Running Successfully...");
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running successfully at port ${PORT}`);
});