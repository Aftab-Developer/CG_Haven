import { youtube_model_table } from "@/models/tutorials/YoutubeModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest) {
    try {
        await dbConnect(); 
        const {searchParams} = request.nextUrl ; 
        const id = decodeURIComponent(searchParams.get("id")!) ; 
        if(!id){
            return NextResponse.json({message:"Id is required",success:false},{status:400}) ; 

        } 
       const isVideoExsists = await youtube_model_table.findOne({_id:id}) ; 
       if(!isVideoExsists){
        return NextResponse.json({message:"Video does not exsists with this id",success:false},{status:400}); 

       } 
       await youtube_model_table.deleteOne({_id:id}) ; 
       return NextResponse.json({message:`${isVideoExsists.tu_name} video is deleted`,success:true},{status:200}) ;
    } catch (error) {
        return NextResponse.json({message:"Sone Thing went wrong please try again later",success:false},{status:500}); 
        
    }
}