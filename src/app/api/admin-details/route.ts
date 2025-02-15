import { adminModel } from "@/models/admin/adminModel";
import { dbConnect } from "@/utils/dbConnect";
import {  NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect() ; 
    const adminDetails = await adminModel.find({}) ; 
    if(!adminDetails){
        return NextResponse.json({message:"No admin ...",success:false},{status:400}) ;
    } 
    return NextResponse.json({message:"here is the admin details",adminDetails,success:true},{status:200}) ;
  } catch (error) {
    console.log(`some error in logging the admin ?? ${error}`);
  }
}