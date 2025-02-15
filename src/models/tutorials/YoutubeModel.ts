import mongoose , {Schema,model,Document} from "mongoose" 
import {TimeStamps} from "@/models/admin/adminModel" 

export interface Tutorials_Youtube extends TimeStamps , Document {
    tu_name : string ,
    tu_des: string ,
    tu_links: string[] ,
    tu_duration:string ,
    video_link:string , 
    software_type: string[] ,
    tu_type:string[] ,
    isBeginner:boolean ,
    isInterMediate :boolean ,
    isAdvanced:boolean ,
    isPatreon:boolean
    views:number
} 

const youtube_Schema = new Schema<Tutorials_Youtube>(
    {
        tu_name : {
            type:String ,
            required :true
        },
        tu_des : {
            type:String ,
            required :true
        } ,
        tu_duration : {
            type:String ,
            required :true
        },tu_links : {
            type:[String] ,
        } ,
        video_link:{
            type:String ,
            required:true
        } ,
        isAdvanced : {
            type:Boolean ,
            default:false
        } ,
        isBeginner : {
            type:Boolean ,
            default:false
        } ,
        isInterMediate : {
            type:Boolean,
            default:false
        } ,
        isPatreon : {
            type: Boolean ,
            default:false
        } ,
        software_type : {
            type: [String]
        } ,
        tu_type: {
            type :[String]
        } ,
        views : {
            type:Number ,
            default:0
        } ,

        
    }
) ; 

export const youtube_model_table = mongoose.models.Youtube_model_table || model<Tutorials_Youtube>("Youtube_model_table",youtube_Schema) ;