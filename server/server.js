const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Server is Running Succesfully...");
});

//DB Connection
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running successfully at port ${PORT}`);
});