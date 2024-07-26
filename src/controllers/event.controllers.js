const Event = require('../models/event.models');
const Order = require('../models/oreder.models');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const sendEmail = require("../utils/sendEmails");


// require('dotenv').config();

const getEvents =async (req, res) => {
  /*This Data should be removed and retrieve through DB Query and serve the response from this controller */
  // const Events = await Event.find();
  // throw new ApiError(404, "EventId does not exist");

  try {
            const events = await Event.find();
            res.json(events);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};
//category event handlers
const getcategory= async (req,res) => {
  try {
    const category = req.params.category;
    const events = await Event.find({ category: category });

    if (events.length === 0) {
        return res.status(404).json({ message: 'No events found in this category' });
    }

    res.json(events);
} catch (error) {
    res.status(500).json({ message: error.message });
}
}
// handle  event by id
const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
} catch (error) {
    res.status(500).json({ message: error.message });
}
}
//create a  new event
const createEvent = async (req, res) => {
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
    rating: req.body.rating
});

try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
} catch (error) {
    res.status(400).json({ message: error.message });
}
}

const orderEmail = async (req, res) => {
  try {
    // Create a new order from the request body
    const order = new Order(req.body);
    await order.save();

    // Define the email template
    const emailTemplate = `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order, ${order.name}!</p>
      <p>Contact Number: ${order.contact}</p>
      <p>We will ship your order to the following address:</p>
      <p>${order.address}</p>
    `;

    // Send the confirmation email
    await sendEmail(order.email, "Order Confirmation", emailTemplate);

    // Respond to the client
    res.status(201).json({ message: 'Order placed successfully and email sent.' });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ message: 'Error processing order', error: error.message });
  }
};

module.exports = {
 getEvents,
 getcategory,
 getEventById,
 createEvent,
 orderEmail
};
