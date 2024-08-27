import express from 'express';
import dotenv from 'dotenv';
import * as eventController from '../controllers/event.controllers.js';
// import { getEvents, getcategory, getEventById, createEvent, orderEmail } from './controllers/event.controllers.js';


// import multer from 'multer';
// import path from 'path';

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads/');
  
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });

// Optionally, if you have a default export in your controller file, you can use:
// import eventController from '../controllers/event.controllers.js';

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
  //update event
  router.put('/:id', eventController.updateEvent);










export default router;