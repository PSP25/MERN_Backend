// const asyncHandler=()=>{}
// export default asyncHandler;
// //or
// export {asyncHandler};

          //the above code is what this file is doing, now lets elaborate above function below

//async handling can be done using try catch block or using promises 
               //promises method
const asyncHandler=(requestHandler)=>{
     return (req,res,next)=>{
     Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
      //if promise resolves then it will go to next function else it will catch the error and pass it to next function
     }
}
export {asyncHandler};
               //using try-catch higher
 //order functions(functions that take functions as paramenters and can return functons)
// const asyncHandler= (fn)=>()=>{}  //basic syntax of higher order function
//lets understand its working
     // const asyncFunction=()=>{}//general function
     // const asyncFunction=(fun)=>{
     //     async ()=>()
     // }//higher order function, function is passed to next function
     // const asyncFunction=(fun)=>async ()=>()//same as above line just in a single line

// const asyncFunction=(fn)=>async (req,res,next)=>{
//      try {
//           await fn(req,res,next)
//      } catch (error) {
//           res.status(error.code||500).json({
//                success:false,
//                message:error.message||"Something went wrong"
//           })
//      }
// }
// export {asyncHandler};