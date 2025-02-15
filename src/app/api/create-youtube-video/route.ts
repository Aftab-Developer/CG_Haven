import { youtube_model_table } from "@/models/tutorials/YoutubeModel";
import { dbConnect } from "@/utils/dbConnect"
import { NextRequest, NextResponse } from "next/server"
 

export async function POST (request:NextRequest) {
    try {
        await dbConnect();  
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
            isAdvanced
        } = await request.json() ;  

        if(!tu_name || !tu_des || !tu_duration ||!tu_links ||!video_link||!software_type || !tu_type){
          return NextResponse.json({message:"All required Fields are mantadory",success:false} ,{status:400}) ;
        } 

        if(!isBeginner && !isInterMediate && !isAdvanced ) {
            return NextResponse.json({message:"One difficulty level is required",success:false},{status:400})
        } 

        if(isBeginner){
            await youtube_model_table.create(
                {
                    tu_name ,
                    tu_des ,
                    tu_duration,
                    tu_links,
                    video_link, 
                    software_type,
                    tu_type,
                    isBeginner    
                }
            ) ;

            return NextResponse.json({message:"Youtube Video uploaded",success:true},{status:200})

        }  

       


        if(isInterMediate){
            await youtube_model_table.create(
                {
                    tu_name ,
                    tu_des ,
                    tu_duration,
                    tu_links,
                    video_link, 
                    software_type,
                    tu_type,
                    isInterMediate    
                }
            ) ;
            return NextResponse.json({message:"Youtube Video uploaded",success:true},{status:200})
            
        } 

        if(isAdvanced){
            await youtube_model_table.create(
                {
                    tu_name ,
                    tu_des ,
                    tu_duration,
                    tu_links,
                    video_link, 
                    software_type,
                    tu_type,
                    isInterMediate    
                }
            ) ;
            return NextResponse.json({message:"Youtube Video uploaded",success:true},{status:200})
            
        }


    } catch (error) {
        return NextResponse.json({message:"Errro uploading video youtube",success:false},{status:500})
    }
}