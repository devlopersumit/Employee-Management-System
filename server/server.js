const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.send("Server is Running Succesfully...");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running successfully at port ${PORT}`);
});