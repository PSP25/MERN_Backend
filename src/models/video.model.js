import mongoose,{Schema} from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
//this aggregate plugin is used to paginate the data and used in whatchHistory
          //before export we use this as a plugin
//the use of "aggregate pipeline" is to perform operations on the data and get the desired output
//it is used to perform operations like group,sort,limit,skip,project,unwind,lookup etc
const videoSchema=new Schema(
     {
          videoFile:{
               type:String,//cloudinary url
               required:true,
          },
          thumbnail:{
               type:String,//cloudinary url
               required:true,
          },
          title:{
               type:String,//cloudinary url
               required:true,
          },
          description:{
               type:String,//cloudinary url
               required:true,
          },
          duration:{
               type:Number,//we will get it from cloudinary
               required:true,
          },
          views:{
               type:Number,
               default:0,
          },
          isPublished:{
               type:Boolean,
               default:false,
          },
          owner:{
               type:Schema.Types.ObjectId,
               ref:"User",
          }

     }
,{timestamps:true});

videoSchema.plugin(mongooseAggregatePaginate);
export const Video=mongoose.model('Video',videoSchema);