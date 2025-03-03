import mongoose,{Schema} from 'mongoose';
import bcrypt from 'bcrypt';//helps hash passwords
import jwt from 'jsonwebtoken';//helps create tokens
//jwt(last part of video) is like key, the bearer gets access to the data
//there are 3 parts of jwt, header, payload, signature
//changes are made in env file first, so go there

//flow video10: model creation,watchHistory aggregate pipeline,bcrypt-pre save hook,compare password,token creation in jwt



const userSchema=new Schema(
     {
          username:{
               type:String,
               required:true,
               unique:true,
               trim:true,
               lowercase:true,
               index:true//this is a concept of DBMS on columns, it is used to make the search faster
               //this also makes it a bit slower to insert data,costly
          },
          email:{
               type:String,
               required:true,
               unique:true,
               trim:true,
               lowercase:true,
          },
          fullname:{
               type:String,
               required:true,
               trim:true,
               index:true,
          },
          avatar:{
               type:String,//cloudinary url
               required:true,
          },
          coverImage:{
               type:String,//cloudinary url
          },
          watchHistory:[
               {
                    type:Schema.Types.ObjectId,
                    ref:"Video"
               }
          ],
          password:{
               type:String,//generally we dont store password in plain text, but if we keep encrypted text how can we map?
               required:[true,"password is required"],//revision of this concept
          },
          refreshToken:{//what are they
               type:String,
          },
     },
     {
          timestamps:true,
     }
)
//why we use pre save hook
//we cannot directly encrypt data, thus mongoose has some middleware functions,hooks to do it like pre,post
//pre is used before the data is saved
//also they listen to events like save,validate,remove,updateOne,init etc

//here we use the pre, and save event.
//they take the event and a callback function
//now, why dont we use the ()=>{} syntax
//because we need to use the this keyword, and arrow functions dont have their own this keyword
//and we need this keyword to access the data of the current instance i.e user
//also encryption takes time so we use async await

//also as this is a middleware, so we need to call next() to move to the next middleware
//if we dont call next() then it will be stuck in the current middleware
userSchema.pre('save',async function (next){
          // this.password=bcrypt.hash(this.password,10);
          // next();

     //a small issue, this above code runs everytime there is an udate in any field,eg email,username etc
     //so we need to check if the password is updated or not
     //we can use isModified() function of mongoose
     //this.isModified("password") will return true if password is updated
     if(!this.isModified("password"))return next();
     this.password= await bcrypt.hash(this.password,10);//hashing takes time so await
     next();
})

userSchema.methods.isPasswordCorrect=async function(pass){
     return await bcrypt.compare(pass,this.password);//the function compares and return bool value
}
// AFTER THIS WE WILL CREATE A TOKEN
userSchema.methods.generateAccessToken=function(){
     //this method creates token for the user and returns it in avriable or directly

     //retuen jwt.sign({payload},accesstoken,expiry_object)
     // this is the syntax of jwt, it takes payload,buffer,secret key,expiresIn
     //this usually doesnt take time but you can use it as async await
     return jwt.sign(
          {
          //the payload:things that i want it to have
          _id:this._id,//this is enogh to fetch user data later, but we give some more info
          email:this.email,
          username:this.username,
          fullname:this.fullname,
          //these are pyload for signing tokens
          },
          //we need access token
          process.env.ACCESS_TOKEN_SECRET,
          {
               expiresIn: process.env.ACCESS_TOKEN_EXPIRY
          }

)
}
userSchema.methods.generateRefreshToken=function(){
     //refrsh token gets refreahed everytime, so wwe store less data in it for better usability
     return jwt.sign(
          {
          
          _id:this._id,//this is enogh to fetch user data later, but we give some more info
          },
          //we need access token
          process.env.REFRESH_TOKEN_SECRET,
          {
               expiresIn: process.env.REFRESH_TOKEN_EXPIRY
          }

     )
}
export const User= mongoose.model('User',userSchema);