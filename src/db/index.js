import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';


const connectDB=async()=>{
     try {
          //the database is connected and respose stored in a variable
          const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}}`)
          //mongoose after connectioin returns a object which is stored in connectionInstance
          console.log(`\n MONGODB CONNECTED!!! DB HOST ${connectionInstance.connection.host}`);//look at connectionInstance in console
          //you will get goos idea of what is happening
          
          
     } catch (error) {
          console.error("DB connection error",error);
          process.exit(1);//there are different exit methods in nodejs, read about them will make you understand the code better
     }
}

export default connectDB;