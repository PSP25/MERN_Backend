import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router= Router();
//avi router ban gaya to isko sab app me import karte he as we keep the index.js clean and only for express, database load
//and listening, app.js imports the router and uses it to give control of a specific route to this router
//go to app.js(lec 13) to see how the router is used

//after getting the access from app.js to this router, we can use the router to handle the routes
router.route("/register").post(registerUser);// rather than defining the post fun here, we have defined it in the controller


export default router;