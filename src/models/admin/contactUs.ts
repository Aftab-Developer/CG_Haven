import mongoose ,{Document,Schema , model} from "mongoose" ;
import { TimeStamps } from "./admin/adminModel";
export interface Contactus extends Document , TimeStamps{
    username:string ,
    email:string,
    description:string
} ; 
export const contactUsSchema = new Schema<Contactus>(
    { 
       username :{
         type : String , 
        required: true 
        } ,
        email:{
        type : String , 
        required: true 
        } ,
        description:{
        type : String , 
        required: true 
        }
    } ,{timestamps:true}
) ; 

export const contactModel = mongoose.models.ContactUs as mongoose.Model<Contactus> || model<Contactus>("ContactUs",contactUsSchema) ;