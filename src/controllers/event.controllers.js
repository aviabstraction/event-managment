import { ApiResponse } from "../utils/ApiResponse.js";
import { Event } from "../models/event.models.js";
import { ApiError } from "../utils/ApiError.js";

const getAllEvents = (req, res) => {
  /*This Data should be removed and retrieve through DB Query and serve the response from this controller */
  // const Events = await Event.find();
  // throw new ApiError(404, "EventId does not exist");

  const sampleData = [
    { event_name: "Marriage", event_date: 20 - 10 - 2026 },
    { event_name: "Birthday", event_date: 10 - 10 - 2033 },
  ];

  return res
    .status(200)
    .json(new ApiResponse(200, sampleData, "Events fetched successfully"));
};

export { getAllEvents };
