import { Router } from "express";
import { getAllEvents } from "../controllers/event.controllers.js";

const router = Router();

router.route("/").get(getAllEvents);

export default router;
