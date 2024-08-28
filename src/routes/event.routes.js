import express from 'express';
import dotenv from 'dotenv';
import * as eventController from '../controllers/event.controllers.js';
// import { getEvents, getcategory, getEventById, createEvent, orderEmail } from './controllers/event.controllers.js';




const router = express.Router();


dotenv.config();

 

// Define your routes
router.get('/', eventController.getAllEvents);
// Define the route for getting all categories
router.get('/categories',eventController.getAllCategories);

router.get("/category/:category", eventController.getCategory);
router.get("/:id", eventController.getEventById);
// router.post("/createEvent", eventController.createEvent);
router.post("/orders", eventController.orderEmail);
// Route for creating a new event with multiple images
router.post('/eventCreate',eventController.createEvent);
  
// Route to handle sending an email
router.post('/contactemail',eventController.sendEmailcontact);









export default router;