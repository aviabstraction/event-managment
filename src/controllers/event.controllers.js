import Event from '../models/event.models.js'; // Ensure the correct path and file extension
import Order from '../models/oreder.models.js'; // Ensure the correct path and file extension
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import sendEmail from '../utils/sendEmails.js';
import category from '../models/allcategory.js';

 // Ensure the correct path and file extension


export const getAllEvents = async (req, res) => {
  try {
      const { city,price, category } = req.query;
      let filter = {};
      if (city) filter.city = city;
      if (price !== undefined) {
          filter.price = { $gte: 0, $lte: parseFloat(price) };
      }
      if (category) filter.category = category;
      const events = await Event.find(filter);
      return res.status(200).json(new ApiResponse(200, events, "Events fetched successfully"));
  } catch (error) {
      console.error('Error in getAllEvents:', error);
      return res.status(500).json(new ApiError(500, null, "Internal Server Error"));
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


export const orderEmail = async (req, res) => {
  try {
    const findOrg = await Event.findById(req.params.id);

    const order = new Order(req.body);
    await order.save();

    const emailTemplate = `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order, ${order.name}!</p>
      <p>Contact Number: ${order.contact}</p>
      <p>We will ship your order to the following address:</p>
      <p>${order.address}</p>`
    ;

    const emailTemplateOrg = `
    <h1>Order Confirmation</h1>
    <p>Thank you for your order, ${findOrg.organizationname}!</p>
    <p>Contact Number: ${findOrg.mobile}</p>
    <p>We will ship your order to the following address:</p>
    <p>${findOrg.address}</p>`;

    await sendEmail(order.email, "Order Confirmation", emailTemplateOrg);

    await sendEmail(findOrg.email, "Order Confirmation", emailTemplate);


    res.status(201).json(new ApiResponse(201, "sucess", 'Order placed successfully and email sent.'));
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json(new ApiError(500, 'Error processing order', error.message));
  }
};


