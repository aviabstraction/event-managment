import Event from '../models/event.models.js'; // Ensure the correct path and file extension
import Order from '../models/oreder.models.js'; // Ensure the correct path and file extension
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import sendEmail from '../utils/sendEmails.js';
import category from '../models/allcategory.js';

 // Ensure the correct path and file extension


export const getAllEvents = async (req, res) => {
  try {
    const { city, price, category, _id } = req.query;
    let filter = {};

   
    if (_id) {
    
      const event = await Event.findById(_id);
      if (!event) {
        return res.status(404).json(new ApiError(404, "Event not found"));
      }
      return res.status(200).json(new ApiResponse(200, event, "Event fetched successfully"));
    }

    if (city) filter.city = city;
    if (price !== undefined) {
      filter.price = { $gte: 0, $lte: parseFloat(price) };
    }
    if (category) filter.category = category;

    
    const events = await Event.find(filter);
    return res.status(200).json(new ApiResponse(200, events, "Events fetched successfully"));
  } catch (error) {
    console.error('Error in getAllEvents:', error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};
//get allcategory events collection 
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
//create a new event in the database

export const createEvent = async (req, res) => {
  const event = new Event({
    
    organizationname: req.body.organizationname,
    eventname: req.body.eventname,
    imageUrl: req.body.imageUrl,
    eventdescription: req.body.eventdescription,
    price: req.body.price,
    city: req.body.city,
    tagline: req.body.tagline,
    about_img: req.body.about_img,
    about: req.body.about,
    imageurl: req.body.imageurl,  // Array of images for the event page
    address: req.body.address,
    whatsapp: req.body.whatsapp,
    mobile: req.body.mobile,
    category: req.body.category,
    email: req.body.email,
    
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
    const data=req.body
    const order = new Order(data);
    console.log('orders',order);
    
    await order.save();
    // const findOrg = await Event.findById(req.params.id);

    // Email template for the user with the organizer's details
    const emailTemplateUser = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
          <h1 style="color: #007bff;">Order Confirmation</h1>
          <h2> Subject: New Order Received</h2>
          <p>Dear ${data.name},</p>
          <p>Thank you for your order! We are excited to confirm your booking for the following event organized by:</p>
          <p><strong>Organizer Name:</strong> ${data.organizerName}</p>
          <p><strong>Organizer Contact:</strong> ${data.organizerMobile}</p>
          <p>The event will be held at:</p>
          <p style="background-color: #e9ecef; padding: 10px; border-radius: 5px;">
            ${data.organizerAddress}
          </p>
          <p>You can <a href="https://tracking-link.com/${data._id}" style="color: #007bff; text-decoration: none;">track your order online</a>.</p>
          <a href="https://tracking-link.com/${data._id}" 
             style="display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; color: #ffffff; background-color: #28a745; text-align: center; text-decoration: none; border-radius: 5px;">
             Track Your Order
          </a>
        </div>
      </div>
    `;

    // Email template for the organizer with the user's order details
    const emailTemplateOrg = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
          <h1 style="color: #dc3545;">New Order Notification</h1>
          <h2> Subject: A New Order Has Been Placed</h2>
          <p>Dear ${data.organizerName},</p>
          <p>We are pleased to inform you that a new order has been placed for your event by:</p>
          <p><strong>User Name:</strong> ${data.name}</p>
          <p><strong>User Contact:</strong> ${data.contact}</p>
          <p>The order will be shipped to the following address:</p>
          <p style="background-color: #e9ecef; padding: 10px; border-radius: 5px;">
            ${data.address}
          </p>
          <p>You can view more details about this order on our <a href="https://organization-website.com/orders/${data._id}" style="color: #007bff; text-decoration: none;">website</a>.</p>
          <a href="https://organization-website.com/orders/${data._id}" 
             style="display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-align: center; text-decoration: none; border-radius: 5px;">
             View Order Details
          </a>
        </div>
      </div>
    `;
    
    // Send the emails
    await sendEmail(data.email, "Order Confirmation", emailTemplateUser);
    await sendEmail(data.organizerEmail, "New Order Notification", emailTemplateOrg);

    res.status(201).json(new ApiResponse(201, "success", 'Order placed successfully and email sent.'));
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json(new ApiError(500, 'Error processing order', error.message));
  }
};