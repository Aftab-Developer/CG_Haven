import mongoose , {Document,Schema,model} from "mongoose" 
import { TimeStamps } from "../admin/adminModel" 
import { Documents } from "./Document"

export interface Type_Interface extends TimeStamps, Document{
    type_name: string , 
    type_des : string ,
    type_image : string ,
    documents_collection :Documents []
} 

export const Type_Schema = new Schema<Type_Interface>(
    {
        type_name : {
            type:String ,
            required:true
        },
        type_des : {
            type:String ,
            required:true
        },
        type_image : {
            type:String ,
            required:true
        },
        documents_collection: [{type:mongoose.Schema.Types.ObjectId , ref : "Documents_datas_Table"}] 
    }
) ;

export const type_model = mongoose.models.Type_model_Table ||model<Type_Interface>('Type_model_Table',Type_Schema) ;