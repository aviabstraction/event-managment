import { Router } from "express";
import { filterPackage, getAllPackages } from "../controllers/package.controllers.js";


const router = Router();

router.route("/").get( getAllPackages );
router.route("/filter").get( filterPackage );


export default router;