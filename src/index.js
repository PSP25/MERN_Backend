//require("dotenv").config({path:'./env'});
//we will use the import method not the rquire method everywhere so we are cmmenting it

import dotenv from "dotenv";
import connectDB from "./db/index.js";


                                   //approach 2 to connect the database(through separate file)
// as eaarly as possible the dotenv should be configured so that the environment variables can be used
//by eany file in the project that has its requirements.

//if we use import we need to configure the dotenv file here
dotenv.config({path:'./env'});
connectDB()














                                   //approach 1 to connect the databas

/*import express from "express";
const app=express();
//use js iffe to immediately invoke the function
//semicolon is used before it tobprevent any errors
;(async()=>{
     try {
          //connect mongoose to the database
          await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
          //connected the database along with its name
          app.on("error",(error)=>{
               console.error("ERROR",error);
               throw(error);
          })//incase the app is not able to talk to the connnected database
          app.listen(process.env.PORT,()=>{
               console.log(`Server is running on port ${process.env.PORT}`);
          })//if the app is able to talk to the connected database
     } catch (error) {
          console.error("ERRORO",error);
          throw error;
     }
})()

*/