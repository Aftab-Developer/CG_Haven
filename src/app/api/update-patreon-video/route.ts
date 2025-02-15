import { patreon_model_table } from "@/models/tutorials/PatreonModel";
import { backblazeUploader } from "@/utils/backBlazeUploader";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest) {
    try {
        await dbConnect() ; 
        const data = await request.formData() ; 
        const tu_name = data.get("tu_name") ;
        const tu_des = data.get("tu_des") ;
        const tu_duration = data.get("tu_duration") ;
        const tu_links = data.get("tu_links") ;
        const tu_type = data.get("tu_type") ;
        const software_type = data.get("software_type") ;
        const isBeginner = data.get("isBeginner") ;
        const isInterMediate = data.get("isInterMediate") ;
        const updated_tut_name = data.get("updated_tut_name") ;
        const isAdvanced = data.get("isAdvanced") ; 
        const ImageFile = data.get("ImageFile") as File && null ; 

        if(!tu_name && !tu_des && !tu_duration &&!tu_links &&!software_type && !tu_type&&!ImageFile){
          return NextResponse.json({message:"All required Fields are mantadory",success:false} ,{status:400}) ;
        } 
          if(!updated_tut_name) {
            return NextResponse.json({message:"updated_tut_name id mantadory",success:false} ,{status:400}) ;
          } 
        const isDocExsists = await patreon_model_table.findOne({tu_name:updated_tut_name}) ; 

        if(!isDocExsists){
            return NextResponse.json({message:"Video with this id not found",success:false},{status:400}) ; 
        } 
        if(tu_name) isDocExsists.tu_name = tu_name ; 
        if(tu_des) isDocExsists.tu_des = tu_des;
        if(tu_duration) isDocExsists.tu_duration = tu_duration;
        if(tu_links) isDocExsists.tu_links = tu_links;
        if(ImageFile) isDocExsists.video_link = await backblazeUploader(ImageFile,"Updated_Patreon_Assests");
        if(software_type) isDocExsists.software_type = software_type;
        if(tu_type) isDocExsists.tu_type = tu_type;
        if(isBeginner) isDocExsists.isBeginner = isBeginner;
        if(isInterMediate) isDocExsists.isInterMediate = isInterMediate;
        if(isAdvanced) isDocExsists.isAdvanced = isAdvanced;
        
        await isDocExsists.save() ; 
        return NextResponse.json({message:`${tu_name} video is updated`,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message:`error updating video Patreon`,success:false},{status:500})
    }
}