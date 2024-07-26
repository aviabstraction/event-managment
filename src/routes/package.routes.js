import { Router } from "express";
import { getAllPackages } from "../controllers/package.controllers.js";


const router = Router();

router.route("/").get( getAllPackages );
// router.route("/category").get( getAllCategories );

export default router;