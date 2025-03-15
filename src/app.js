//include express first
//we need to install packages like cookies and cors to use them in the app
import dotenv from "dotenv";
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
//creating the express app
const app=express();

//to access middlewares and configs we use app.use
//cors provide options to the app for the cross origin requests and settings change
//some examples are origin,methods,credentials etc

//app.use is used for configuration and middleware handling
app.use(cors({
     origin:process.env.CORS_ORIGIN,//THE URL OF THE FRONTEND FROM WHERE IT ACCEPTS REQUESTS
     credentials:true
}))

//DATA COMES FROM MANY WAYS FROM BACKEND TO FRONTEND, LIKE JSON,URL ENCODED,BODY(FORM),FILE_UPLOADING
//SO WE NEED TO HANDLE SETTINGS FOR ALL OF THEM
                              //major configurations are done below
//1..TO HANDLE JSON DATA(it is middleware so we use app.use)
app.use(express.json({limit:"16kb"}));//16kb is the limit of the data that can be sent to the server

//2..handle data sent through url, like space is treated as %20 etc..so we need to handle it
//app.use(express.urlencoded());//this is also ok
app.use(express.urlencoded({extended:true,limit:"16kb"}));//16kb is the limit of the data that can be sent to the server

//3..handle file storing using static
app.use(express.static("public"));//stores the files in public folder

//4..cookie parser is used so that i can perform CRUD operations on browsers cookies from server side
//it is used to parse the cookies
app.use(cookieParser());

//lec13
//routes ko yaahan load karte he
//import routes
import userRouter from './routes/user.routes.js';

//routes declaration
//we use app.get here when routes and controllers are declared here in this file
//but as we have separated the files now, thus we will require middlewares 
//thue we call app.use to use middlewares

//app.use("/users",userRouter);
//with this above call, when the user hits the /users(can be any name) route, the userRouter will be called
// the control is given to the user.router.js file(go there to check what happens next)
//the url created is: http://localhost:3000/users/register (register is what we get from the user.router.js file)

//for better code involving api, we give the detail about api and version in the router
//thus we use the below code
app.use("/api/v1/users",userRouter);//why api, because isme ham backend pe register kara rahe he aur status de rahe he,
// so backend frontend communicatioin ho raha he
//new url created: http://localhost:3000/api/v1/users/register
//while running you can check about the problems and details in postman or thunderclient






//export default app;
//or
export {app};
