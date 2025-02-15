import { feedBackModel } from "@/models/feedBack";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request:NextRequest) => {
  try {
      await dbConnect() ; 
      const {searchParams} = request.nextUrl ; 
      const decodeId = decodeURIComponent(searchParams.get('id') as string) ; 
      if(!decodeId) {
        return NextResponse.json({message:"id is required"},{status:400}) ; 

      } 
      const isDeleted = await feedBackModel.deleteOne({_id:decodeId}) ; 
      if(!isDeleted) {
        return NextResponse.json({message:"Not deleted"},{status:400}) ; 
      }  
      return NextResponse.json({message:"Deleted the feedback"},{status:200}) ; 
  } catch (error) {
    console.log(`some error deleting feedback ${error}`);
    
  }
}