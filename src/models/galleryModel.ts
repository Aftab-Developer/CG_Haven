import mongoose ,{Schema,model,Document} from "mongoose" ; 
import { TimeStamps } from "./admin/adminModel"; 

export interface Gallery extends Document,TimeStamps {
    image:string
} ; 

export const gallerySchema = new Schema<Gallery>({
    image : {
        type:String ,
        required:[true,"image is required"]
    }
},{timestamps:true}) ;

export const galleryModel = mongoose.models.Gallery as mongoose.Model<Gallery>
 || model<Gallery>("Gallery",gallerySchema) ;