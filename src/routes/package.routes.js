import { Router } from "express";
import { filterPackage } from "../controllers/package.controllers.js";


const router = Router();

// router.route("/").get( getAllPackages );
 router.route("/").get( filterPackage );
export default router;