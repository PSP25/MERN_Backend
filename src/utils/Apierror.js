class ApiError extends Error{
     constructor(statusCode,message="some error occured",errors=[],statck=""){
          super(message);
          this.statusCode=statusCode;
          this.data=null;//read about what happens in this.data read in node js
          this.message=message;
          this.success=false;//we keep it false as success code is not sent here as this is api error handling not 
          //api response handling
          this.errors=errors;
          if(statck){//helps banckend engg understand where the error occured in a structured way
               //we remove it during production
               this.stack=statck;
          }else{
               Error.captureStackTrace(this,this.constructor);
               //here we pass the reference and instance of the context of the error
          }
     }
}
//node js has default api error handling class as above
//but we use express js for api response and it doesnt provide default error handling class
//so we are going to create our own error handling class
export {ApiError};