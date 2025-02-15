import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { adminModel } from "@/models/admin/adminModel";
export async function POST(request:NextRequest) {
  const {ad_name,ad_email,ad_password,ad_bio} = await request.json(); 
  const hashedPass = await bcrypt.hash(ad_password,10);  
  const admin = new adminModel({
    ad_name ,
    ad_email ,
    ad_bio ,  
    ad_password:hashedPass ,
    ad_otp : "" ,
    otp_expiry: "" ,
    ad_banner: "" ,
   
}) ; 
await admin.save(); 

  return NextResponse.json({message:"admin created"},{status:200}) ;
}