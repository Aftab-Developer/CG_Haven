import mongoose, {Document,Schema ,model} from "mongoose";
import { TimeStamps } from "./admin/adminModel";

export interface Banner extends Document,TimeStamps{
    title : string ,
    description :string ,
    image_url : string
}

export const banner_schema = new Schema<Banner>({
    title: {
        type:String ,
        required:true
    },
    description: {
        type:String ,
        required:true
    },
    image_url: {
        type:String ,
        required:true
    }
},{timestamps:true}) ; 

export const banner_model = mongoose.models.BannerModel as mongoose.Model<Banner> || model<Banner>('BannerModel',banner_schema); 
