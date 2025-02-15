import { trackingModel } from "@/models/conversionTracking";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
  try {
    await dbConnect(); 
    const {trackingCode} = await request.json(); 
    if(!trackingCode) {
        return NextResponse.json({message:"tracking code is required",success:false},{status:400}) ;
    } 
    const data  = await trackingModel.find({}); 
    if(!data) {
        return NextResponse.json({message:"Please add tarcking code before updating",success:false},{status:400}) ;

    } 
    data[0].trackingCode = trackingCode ; 
    await data[0].save(); 
    return NextResponse.json({message:"Tracking code updated",success:true},{status:200}) ;

  } catch (error) {
    console.log("errro updating tracking code")
  }
}