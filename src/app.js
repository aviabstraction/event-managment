import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import eventRoute from '../src/routes/event.routes.js';

const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(cors());
app.use(express.json());
const apiBasePath = "/api";

app.use(`${apiBasePath}/event`, eventRoute);

// Connect to MongoDB
mongoose.connect('mongodb+srv://snehandckap:sneha@cluster0.ucarnhe.mongodb.net/youtube?retryWrites=true&w=majority')
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});