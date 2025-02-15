import mongoose ,{Document ,Schema} from "mongoose"; 
import { TimeStamps } from "./admin/adminModel";

export interface FeedBack extends Document , TimeStamps{
    username : string , 
    email : string ,
    feedBackdes : string
}

export const feedBackSchema = new Schema<FeedBack>(
    {
        username:{
            type:String ,
            required:true
        }  ,
        email:{
            type:String ,
            required:true
        } ,
        feedBackdes :{
            type:String ,
            required:true
        }
    },{timestamps:true}
) ; 

export const feedBackModel = mongoose.models.Feedback as mongoose.Model<FeedBack>
||mongoose.model<FeedBack>('Feedback',feedBackSchema); 