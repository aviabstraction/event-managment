import Event from '../models/event.models.js'; // Ensure the correct path and file extension
import Order from '../models/oreder.models.js'; // Ensure the correct path and file extension
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import cors from 'cors';
import path from 'path';
import sendEmail from '../utils/sendEmails.js';

 // Ensure the correct path and file extension

// require('dotenv').config();

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getcategory = async (req, res) => {
  try {
    const category = req.params.category;
    const events = await Event.find({ category });

    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found in this category' });
    }

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
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
    rating: req.body.rating
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
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

    res.status(201).json({ message: 'Order placed successfully and email sent.' });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ message: 'Error processing order', error: error.message });
  }
};
