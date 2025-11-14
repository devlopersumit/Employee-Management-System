const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const router = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const departmentRouter = require('./routes/departmentRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5000',
    credentials: true
}));

// DB Connection
connectDB();

// Routing
app.use('/api', router);
app.use('/api/users', userRouter);
app.use('/api/departments', departmentRouter);

app.get('/', (req, res) => {
    res.send("Server is Running Successfully...");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running successfully at port ${PORT}`);
});