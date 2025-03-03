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





//export default app;
//or
export {app};
