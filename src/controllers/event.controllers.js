import Event from '../models/event.models.js'; // Ensure the correct path and file extension
import Order from '../models/oreder.models.js'; // Ensure the correct path and file extension
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import sendEmail from '../utils/sendEmails.js';
import category from '../models/allcategory.js';

 // Ensure the correct path and file extension

// require('dotenv').config();
// export const getEvents = async (req, res) => {
//   try {
//     const events = await Event.find();
//     res.status(200).json(new ApiResponse(200, events));
//   } catch (error) {
//     res.status(500).json(new ApiError(500, error.message));
//   }
// };

export const getAllEvents = async (req, res) => {
  try {
 
      // Fetch events based on query parameters
      const events = await Event.find(req.query);

      // Return the found events, even if the array is empty
      return res
          .status(200)
          .json(new ApiResponse(200, events, "Events fetched successfully"));
  } catch (error) {
      // Handle any errors that occur during the query
      return res
          .status(500)
          .json(new ApiError(500, null, 'Internal Server Error, please provide valid credentials'));
  }
};
export const getCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const events = await Event.find({ category });

    res.status(200).json(new ApiResponse(200, events));
  } catch (error) {
    res.status(500).json(new ApiError(500, error.message));
  }
};

export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    res.status(200).json(new ApiResponse(200, event));
  } catch (error) {
    res.status(500).json(new ApiError(500, error.message));
  }
};

export const createEvent = async (req, res) => {
  const event = new Event({
    _id: req.body._id,
    organizationname: req.body.organizationname,
    eventname: req.body.eventname,
    imageurl: req.body.imageurl,
    eventdescription: req.body.eventdescription,
    price: req.body.price,
    address: req.body.address,
    whatsapp: req.body.whatsapp,
    mobile: req.body.mobile,
    category: req.body.category,
    email: req.body.email,
    rating: req.body.rating,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(new ApiResponse(201, newEvent, "Event created successfully"));
  } catch (error) {
    res.status(400).json(new ApiError(400, error.message));
  }
};

// Get all categories
export const getAllCategories = async (req, res, next) => {
  try {
      const events = await category.find();  // Fetch all events from the database
      res.status(200).json(new ApiResponse(200, events, 'Events fetched successfully'));
  } catch (error) {
      next(new ApiError(500, 'Failed to fetch events', [error.message]));
  }
};

// Define the filterEvents function
export const getEventsByCityAndPrice = async (req, res) => {

  try {
    // console.log("getEventsByCityAndPrice");
      const { category,city, price } = req.query;

      const events = await Event.find({category:category, city: city, price: Number(price) });

      if (events.length > 0) {
          res.status(200).json(events);
      } else {
          res.status(404).json({ message: 'No events found for the given criteria.' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const orderEmail = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    const emailTemplate = `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order, ${order.name}!</p>
      <p>Contact Number: ${order.contact}</p>
      <p>We will ship your order to the following address:</p>
      <p>${order.address}</p>
    `;

    await sendEmail(order.email, "Order Confirmation", emailTemplate);

    res.status(201).json(new ApiResponse(201, null, 'Order placed successfully and email sent.'));
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json(new ApiError(500, 'Error processing order', error.message));
  }
};