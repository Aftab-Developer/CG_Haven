import { youtube_model_table } from "@/models/tutorials/YoutubeModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest) {
    try {
        await dbConnect() ; 
        const {
            tu_name ,
            tu_des ,
            tu_duration,
            tu_links,
            video_link, 
            software_type,
            tu_type,
            isBeginner,
            isInterMediate,
            isAdvanced ,
            updated_tut_name
        } = await request.json() ;   

        if(!tu_name && !tu_des && !tu_duration &&!tu_links &&!video_link&&!software_type && !tu_type ){
            return NextResponse.json({message:"All required Fields are mantadory",success:false} ,{status:400}) ;
          } 
          if(!updated_tut_name) {
            return NextResponse.json({message:"updated_tut_name id mantadory",success:false} ,{status:400}) ;
          } 
        const isDocExsists = await youtube_model_table.findOne({tu_name:updated_tut_name}) ; 

        if(!isDocExsists){
            return NextResponse.json({message:"Video with this id not found",success:false},{status:400}) ; 
        } 
        if(tu_name) isDocExsists.tu_name = tu_name ; 
        if(tu_des) isDocExsists.tu_des = tu_des;
        if(tu_duration) isDocExsists.tu_duration = tu_duration;
        if(tu_links) isDocExsists.tu_links = tu_links;
        if(video_link) isDocExsists.video_link = video_link;
        if(software_type) isDocExsists.software_type = software_type;
        if(tu_type) isDocExsists.tu_type = tu_type;
        if(isBeginner) isDocExsists.isBeginner = isBeginner;
        if(isInterMediate) isDocExsists.isInterMediate = isInterMediate;
        if(isAdvanced) isDocExsists.isAdvanced = isAdvanced;
        
        await isDocExsists.save() ; 
        return NextResponse.json({message:`${tu_name} video is updated`,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message:`error updating video youtube`,success:false},{status:500})
    }
}