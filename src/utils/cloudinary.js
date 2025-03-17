//this is a cross project reusable code, so in any project you can directly copy this code

import {v2 as cloudinary} from 'cloudinary';//rename it to cloudinary this v2 for better readablility
import fs from 'fs';//file system module given by nodejs by default, helps read,write,remove files, open files etc
//more or less like file handling in c,c++,java
//what we need is file path
//deletion is done by "unlinking" the file

cloudinary.config({ 
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
     api_key: process.env.CLOUDINARY_API_KEY, 
     api_secret:process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
 });
 

 //LETS CREATE METHOD, WE GET THE PATH OF FILE, WE UPLOAD IT, IF SUCCES WE UNLINK IT FROM LOCAL STORAGE
     //IF ERROR WE RETURN ERROR
const uploadOnCloudinary=async(local_file_path)=>{
     try {
         if(!local_file_path){
           return null;//you can send an error message
         }
         //cloudinary.uploader.upload(path,{uploadoptions},other parameters) 
         // syntax to upload files to cloudinary
         const response=await cloudinary.uploader.upload(local_file_path,{
          resource_type:"auto"   //we get many options here, for now we will use resource_type
         });//as they are optioins so wwe use curly braces
         //we can give many things like folder name, tags, public_id etc
         //we can also give callback function

         //uploaded, so we give a message and print the url to the files
         //console.log("File uploaded to cloudinary",response.url);
         //return the response for user to get data when required

         //we can unlink the files from local storageif esuccesfully uploaded to cloudinary
         //this should be done after reunning the function in post man and checking
         fs.unlinkSync(local_file_path);
         return response;

     } catch (error) {
          //this above function runs after the file is uploaded in local server temporarily
          //thus if error occurs we need to delete the file
          //unlink is a function of fs module
          fs.unlinkSync(local_file_path);//unlinkSync is used to remove the file
          //we use Sync as we want to delete the file before the function ends
          return null;//you can send an error message
     }
}
export {uploadOnCloudinary};//exporting the function so that it can be used in other files
//this function is used in multer.middleware.js file