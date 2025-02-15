import mongoose , {Document,model,Schema} from "mongoose"; 
import { TimeStamps } from "../admin/adminModel";
import { Type_Interface, type_model } from "./typeModel"; 

export interface subCategory extends Document ,TimeStamps{
    sub_ca_name : string ,
    sub_ca_des : string ,
    sub_ca_image: string ,
    type_models_data : Type_Interface[]
}

const sub_categorySchema = new Schema<subCategory>(
    {
        sub_ca_name : {
            type: String ,
            required : true
        } ,
        sub_ca_des : {
            type :String ,
            required : true
        } ,
        sub_ca_image : {
            type:String ,
            required : true
        } ,
        type_models_data : [{type:mongoose.Schema.Types.ObjectId , ref: "Type_model_Table"}] 
    } ,{
        timestamps : true
    }
) ; 
 
export const sub_category_model =  mongoose.models.Sub_category_model_data ||   model<subCategory>("Sub_category_model_data",sub_categorySchema)