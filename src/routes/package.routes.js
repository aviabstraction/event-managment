import { Router } from "express";
import { filterPackage, getAllPackages } from "../controllers/package.controllers.js";


const router = Router();

router.route("/").get( getAllPackages );
router.route("/filterPackage").get( filterPackage );


export default router;