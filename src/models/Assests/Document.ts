import mongoose , {Document,model,Schema} from "mongoose"; 
import { TimeStamps } from "../admin/adminModel";
import { Files } from "./FilesModel";
import { Other_Schema } from "./Other.Model";

export interface Documents extends Document ,TimeStamps{
    doc_name : string ,
    doc_des : string ,
    doc_name_image: string , 
    isPatreon : boolean,
    downloads : number ,
    items_files : [Files] ,
    others : Other_Schema[] 
}

const document_schema = new Schema<Documents>(
    {
        doc_name : {
            type: String ,
            required : true
        } ,
        doc_des : {
            type :String ,
            required : true
        } ,
        doc_name_image : {
            type:String ,
            required : true
        } , 

        isPatreon : {
          type : Boolean ,
          required : true ,
          default:false
        } , 
        downloads : {
            type:Number ,
            default : 0
        } ,
        items_files : [{type:mongoose.Schema.Types.ObjectId , ref : "File_model_Table"}]  ,
        others : [String] 

    } ,{
        timestamps : true
    }
) ; 
 
export const documents_model =  mongoose.models.Documents_datas_Table ||   model<Documents>("Documents_datas_Table", document_schema)