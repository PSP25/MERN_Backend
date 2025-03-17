import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"; //from lec 14, we need to import the middleware to upload the files

const router= Router();
//avi router ban gaya to isko sab app me import karte he as we keep the index.js clean and only for express, database load
//and listening, app.js imports the router and uses it to give control of a specific route to this router
//go to app.js(lec 13) to see how the router is used

//after getting the access from app.js to this router, we can use the router to handle the routes
//router.route("/register").post(registerUser);// rather than defining the post function here,
                                             //  we have defined it in the controller
//lec14, we need to upload the files before the register route is hit, thus we need to use the middleware

//middeleware inject syntax outer.route("/register").post(middleware function, registerUser)
router.route("/register").post(upload.fields([//upload is the middleware we created
     //we use the field option here, there are many options that upload prodes
     //field takes arrays of objects, each object has a name and maxCount etc
     {name:"avatar",maxCount:1},{name:"coverImage",maxCount:1}//we define the name and maxcount of the files
]), registerUser
)


export default router;