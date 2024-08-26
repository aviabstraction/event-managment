import { Router } from "express";
import { filterPackage ,createPackage } from "../controllers/package.controllers.js";


const router = Router();


 router.route("/").get( filterPackage );
 router.route("/create").post( createPackage );

export default router;