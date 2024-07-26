
const express = require("express");

const router = express.Router();

require("dotenv").config();

const eventController = require("../controllers/event.controllers");


// const verifyAuthMiddleware = require("../middleware/authMiddleware");
router.get("/", eventController.getEvents);
router.get("/category/:category", eventController.getcategory);
router.get("/events/:id", eventController.getEventById);
router.post("/createEvent", eventController.createEvent);
router.post("/orders", eventController.orderEmail)






module.exports = router;
