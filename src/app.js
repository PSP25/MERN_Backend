//include express first
//we need to install packages like cookies and cors to use them in the app
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
//creating the express app
const app=express();

//to access middlewares and configs we use app.use
//cors provide options to the app for the cross origin requests and settings change
//some examples are origin,methods,credentials etc
app,use(cors({
     origin:process.env.CORS_ORIGIN,//THE URL OF THE FRONTEND FROM WHERE IT ACCEPTS REQUESTS
     credentials:TRUE

}))
//DATA COMES FROM MANY WAYS FROM BACKEND TO FRONTEND, LIKE JSON,URL ENCODED,BODY(FORM),FILE_UPLOADING
//SO WE NEED TO HANDLE SETTINGS FOR ALL OF THEM

//TO HANDLE JSON DATA


//export default app;
//or
export {app};
