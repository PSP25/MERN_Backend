import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';


const connectDB=async()=>{
     try {
          //the database is connected and respose stored in a variable
          const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}}`)

          console.log(`\n MONGODB CONNECTED!!! DB HOST ${connectionInstance.connection.host}`);
          
          
     } catch (error) {
          console.error("DB connection error",error);
          process.exit(1);
     }
}

export default connectDB;