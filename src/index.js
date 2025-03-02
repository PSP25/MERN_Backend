//require("dotenv").config({path:'./env'});
//we will use the import method not the rquire method everywhere so we are cmmenting it

import dotenv from "dotenv";
import connectDB from "./db/index.js";


                                   //approach 2 to connect the database(through separate file)
// as eaarly as possible the dotenv should be configured so that the environment variables can be used
//by eany file in the project that has its requirements.

//if we use import we need to configure the dotenv file here
//here we do the connection in index.js in db folder and call it here, so that the connection is made
//but in approach 1 we do everything in a place and do not call it from anywhere

//why use dotenv here??
//because we need to use the environment variables in the connectDB file and we need to configure the dotenv file
//so that the environment variables can be used by the connectDB file
//if we do not use dotenv here, we need to configure the dotenv file in the connectDB file
//and we need to configure the dotenv file in every file that uses the environment variables
//so to avoid this we use dotenv here so that the environment variables can be used by any file in the project
dotenv.config({path:'./env'});
connectDB()
.then(()=>{
     app.on("error",(error)=>{
          console.error("ERROR",error);
          throw(error);
     })//if error on connecting the database

     app.listen(process.env.port||3000,()=>{
          console.log(`Server is running on port ${process.env.PORT}`);
     })

})
.catch((err)=>{
     console.error("DB connection error",err);
     process.exit(1);
});














                                   //approach 1 to connect the databas

/*import express from "express";
const app=express();
//use js iffe to immediately invoke the function
//semicolon is used before it to prevent any errors
;(async()=>{
     try {
          //connect mongoose to the database
          await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
          //connected the database along with its name
          app.on("error",(error)=>{
               console.error("ERROR",error);
               throw(error);
          })//incase the app is not able to talk to the connnected database

          //listening to the promise sent by async and connecting is app was able to talk to the connected database
          app.listen(process.env.PORT||3000,()=>{
               console.log(`Server is running on port ${process.env.PORT}`);
          })//if the app is able to talk to the connected database
     } catch (error) {
          console.error("ERRORO",error);
          throw error;
     }
})()

*/