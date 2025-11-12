const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());

//DB Connection
connectDB();

app.use('/api', router)

app.get('/', (req, res) => {
    res.send("Server is Running Succesfully...");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running successfully at port ${PORT}`);
});