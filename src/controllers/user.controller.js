import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser=asyncHandler(async(req,res)=>{//there are two more parameters like error and next
     res.status(200).json({//syntax res.status(status code).json({data you want to send as json})
          message:"chai code lec 13"
          //status code can be sent any number, but the most common are 200,201,400,404,500
          //like its not mandatory to send 200 for success and 400 for bad request, but it is a convention
          //if you send 400, the postman will show 400 but as it knows this is for error, it will show it in red
          //even if the message is successfully passed
     })
})
//method to bana dia, aab isko route pe connect karna hai taake jab route hit ho to ye method call ho

export {registerUser};//exporting the method so that it can be used in routes
