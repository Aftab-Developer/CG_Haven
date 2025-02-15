import { youtube_model_table } from "@/models/tutorials/YoutubeModel";
import { backblazeUploader } from "@/utils/backBlazeUploader";
import { dbConnect } from "@/utils/dbConnect"
import { NextRequest, NextResponse } from "next/server"
 

export async function POST (request:NextRequest) {
    try {
        await dbConnect();   
        const data = await request.formData() ; 
        const tu_name = data.get("tu_name") ;
        const tu_des = data.get("tu_des") ;
        const tu_duration = data.get("tu_duration") ;
        const tu_links = data.get("tu_links") ;
        const tu_type = data.get("tu_type") ;
        const software_type = data.get("software_type") ;
        const isBeginner = data.get("isBeginner") ;
        const isInterMediate = data.get("isInterMediate") ;
        const isAdvanced = data.get("isAdvanced") ; 
        const ImageFile = data.get("ImageFile") as File || null ; 

        if(!tu_name || !tu_des || !tu_duration ||!tu_links ||!software_type || !tu_type||!ImageFile){
          return NextResponse.json({message:"All required Fields are mantadory",success:false} ,{status:400}) ;
        } 

        if(!isBeginner && !isInterMediate && !isAdvanced ) {
            return NextResponse.json({message:"One difficulty level is required",success:false},{status:400})
        } 
          const video_link = await backblazeUploader(ImageFile,"Patreon_videos")  ;
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

            return NextResponse.json({message:"Patreon Video uploaded",success:true},{status:200})

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
            return NextResponse.json({message:"Patreon Video uploaded",success:true},{status:200})
            
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
            return NextResponse.json({message:"Patreon Video uploaded",success:true},{status:200})
            
        }


    } catch (error) {
        return NextResponse.json({message:"Errro uploading video Patreon",success:false},{status:500})
    }
}