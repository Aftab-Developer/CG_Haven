import mongoose , {Document,model,Schema} from "mongoose"; 
import { TimeStamps } from "../admin/adminModel"; 

export interface File_Details extends Document,TimeStamps {
    fileName :string ,
    quality:string ,
    uploadedUrl:string ,
    extension:string
}

export interface Files {
    files : object
}
const fileDetails = new Schema<File_Details>(
    { 
        fileName : {
            type:String ,
            required :true
        } ,
        quality: {
            type:String ,
            required:true
        } ,
        uploadedUrl : {
            type:String ,
            required:true
        } ,
        extension : {
            type:String ,
            required:true
        }
    } 
) ;

const filesSchema  = new Schema(
   {
    files: {
        type: Object,  
        required: true
      }
   }
) ; 

export const file_model = mongoose.models.File_model_Table || model("File_model_Table",filesSchema)