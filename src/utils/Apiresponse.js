class Apiresponse{
     constructor(statusCode,data,message="Success"){
          this.statusCode=statusCode;
          this.data=data;
          this.message=message;
          this.success=statusCode<400;
          //servers have status codes, 200 is success, 400 is client error, 500 is server error, 100-199 is informational
          //300-399 is redirection
     }
}
export {Apiresponse};