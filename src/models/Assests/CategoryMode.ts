import mongoose , {Document,model,Schema} from "mongoose"; 
import { TimeStamps } from "../admin/adminModel";
import { subCategory } from "./sub_categoryModel";

export interface Category extends Document ,TimeStamps{
    ca_name : string ,
    ca_des : string ,
    ca_image: string ,
    sub_categories : subCategory[] ,

}

const categorySchema = new Schema<Category>(
    {
        ca_name : {
            type: String ,
            required : true
        } ,
        ca_des : {
            type :String ,
            required : true
        } ,
        ca_image : {
            type:String ,
           
        } , 
         sub_categories : [{type:mongoose.Schema.Types.ObjectId , ref: "Sub_category_model"}] ,
       
    } ,{
        timestamps : true
    }
) ;
 
export const category_model =  mongoose.models.Category_model ||   model<Category>("Category_model",categorySchema)