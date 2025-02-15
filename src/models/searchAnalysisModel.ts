import mongoose, {Schema,model,Document} from "mongoose";
import { TimeStamps } from "./admin/adminModel"; 

export interface SAQ extends Document,TimeStamps {
    uid : string ,
    month : string ,
    day : string, 
    searchQuery: string ,
    isAccomplised: boolean
} 

export const daily_active_users_schema = new Schema<SAQ>({
    uid : {
        type:String ,
        required:true
    } , 
    month: {
        type:String ,
        required :true
    } ,
    day:{
        type: String ,
        required:true
    } , 
    searchQuery : {
        type:String ,
        required : true
    } ,
    isAccomplised : {
        type:Boolean ,
        required:true
    }

},{timestamps:true}); 

export const searchAnalysisModel = mongoose.models.SearchAnalysis as mongoose.Model<SAQ>
|| model<SAQ>('SearchAnalysis',daily_active_users_schema) ;