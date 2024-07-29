import express from 'express';
import dotenv from 'dotenv';
import * as eventController from '../controllers/event.controllers.js';
// import { getEvents, getcategory, getEventById, createEvent, orderEmail } from './controllers/event.controllers.js';



// Optionally, if you have a default export in your controller file, you can use:
// import eventController from '../controllers/event.controllers.js';

dotenv.config();

const router = express.Router();

// Define your routes
router.get("/", eventController.getEvents);
router.get("/category/:category", eventController.getcategory);
router.get("/events/:id", eventController.getEventById);
router.post("/createEvent", eventController.createEvent);
router.post("/orders", eventController.orderEmail);

export default router;