import { trackingModel } from "@/models/conversionTracking";
import { dbConnect } from "@/utils/dbConnect"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request:NextRequest) {
  try { 
    await dbConnect(); 
    const {trackingCode} = await request.json();  
    
    if(!trackingCode) {
        return NextResponse.json({message:"Pease enter code",success:false},{status:400})
    } 
    const dataCode = await trackingModel.find({}) ; 
    if(dataCode) {
      dataCode[0].trackingCode += trackingCode  ; 
      await dataCode[0].save() ;
    } else {
      await trackingModel.create({
        trackingCode
      }) ;
    }
    
        return NextResponse.json({message:"Added to the Head",success:true},{status:200})

    
  } catch (error) {
    console.log("error tracking code")
  }
} 