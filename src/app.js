const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(cors());
app.use(express.json());
const apiBasePath = "/api";

const eventRoute = require("../src/routes/event.routes");
app.use(`${apiBasePath}/event`, eventRoute);

//Connect to MongoDB
mongoose.connect('mongodb+srv://snehandckap:sneha@cluster0.ucarnhe.mongodb.net/youtube?retryWrites=true&w=majority&appName=Cluster0', {
  
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
