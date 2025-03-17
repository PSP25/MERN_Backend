import { asyncHandler } from "../utils/asyncHandler.js";

import {ApiError} from "../utils/apierror.js";//lec 14, we need to import the api error class
import {User} from "../models/user.model.js";//lec 14, we need to check if user already exists, thus we need to import the user model
import { uploadOnCloudinary } from "../utils/cloudinary.js";//from lec 14
import { Apiresponse } from "../utils/Apiresponse.js";
const registerUser=asyncHandler(async(req,res)=>{//there are two more parameters like error and next
     // res.status(200).json({//syntax res.status(status code).json({data you want to send as json})
     //      message:"chai code lec 13"
     //      //status code can be sent any number, but the most common are 200,201,400,404,500
     //      //like its not mandatory to send 200 for success and 400 for bad request, but it is a convention
     //      //if you send 400, the postman will show 400 but as it knows this is for error, it will show it in red
     //      //even if the message is successfully passed
     // })

          //lec 14, actual logic of register user
     //Get user data from frontend
     //check validation of received data
     //check if user already exists
     //check if req.files are there are not
     //upload the files to cloudinary and get the url, check for successful upload
     //create user object for mongoDB usage
     //remove password and response token
     //check user creation
     //return response

     const {email,username, fullname, password}=req.body;//req.body is used in case of json and form data, url data is handled by req.params
     //we get the data and destructure it to get desired fields
     //console.log("email:",email);//check in postman, 

     
     
     //we have got the data, but data can be detructured but files cannot 
     //thus the files like avatar and coverimage need to be uploaded to local storage for
     //further upload on cloudinary later
     //for this we created a middleware, thus we need to call it before the /register route in user.route.js
//****proTIP: console log everything to know about them better */

     //now check validation of data
     if ([username,email,fullname,password].some((field)=>{
          return field?.trim()==="";
     })) {
          throw new ApiError(400,"all fields are required");//sending the parameters to the apiError class constructors
     }
     

     //now check if user already exists, using User as it is created through mongoose
     //we will use the findOne method
     //User.findOne({})//this is the general syntax
     const existedUser= await User.findOne({//if you donot use await, it will show user already exists, but will still create the user
          //we will use some advanced js concepts here called as $or:[]
          //what this does is checks all parameters in the array and if any one is true, it returns true
          $or:[{username},{email}]
     })
     if(existedUser){
          throw new ApiError(409,"user already exists");
     }

     //now we will handle images and avatar(compulsory) and coverimage(optional)
     //req is used to get these, now body gicves the data, but files give the files, this is what
     //we got from the multer middleware
     //console.log("files:",req.files);//check
     const avatarLocalPath=req.files?.avatar[0]?.path;//we get the first file from the avatar array, and then we fetch the path from it
     //const coverImageLocalPath=req.files?.coverImage[0]?.path;

     //checking for cover image
     let coverImageLocalPath;
     if(req.files&&req.files.coverImage&&req.files.coverImage.length>0){
          coverImageLocalPath=req.files.coverImage[0].path;
     }


     if(!avatarLocalPath){
          throw new ApiError(400,"avatar is required");
     }
     //upload on cloudinary
     const avatar=await uploadOnCloudinary(avatarLocalPath);//we need to await this as it is an async function
     const coverImage=await uploadOnCloudinary(coverImageLocalPath);
     if(!avatar){
          throw new ApiError(400,"avatar is required");
     }
     
     //now, if everything is set create user object in database through User
     const user=await User.create({
          email,
          username:username.toLowerCase(),//we can use toLowerCase() to convert the username to lowercase
          fullname,
          password,
          avatar:avatar.url,//as cloudinary returns an object, we need to get the url from it, it is checked
          coverImage:coverImage?.url||""//here we need to check
     })
     //check if user is created, then remve the password and refresh token
     const createdUser=await User.findById(user._id).select("-password -refreshToken");//we use select to remove the password and refresh token
     //createdUser.select("-password -refreshToken");//we use select to remove the password and refresh token
     if(!createdUser){
          throw new ApiError(500,"user not created");
     }
     //now its time to send the response
     return res.status(201).json(
          new Apiresponse(200,createdUser,"user registered successfully")
     )
})
//method to bana dia, aab isko route pe connect karna hai taake jab route hit ho to ye method call ho
export {registerUser};//exporting the method so that it can be used in routes
