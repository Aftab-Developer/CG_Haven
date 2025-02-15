import { adminModel } from "@/models/admin/adminModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) { 
    try {
        const {otp} = await request.json() ; 
        if(!otp) {
            return NextResponse.json({message:"invalid otp" ,success:false},{status:400}); 
             ;
        }  

        const admin = await adminModel.findOne({ad_otp:otp}) ; 
        if(!admin) {
            return NextResponse.json({message:"invalid otp" ,success:false},{status:400}); 
        }   else { 
            if(admin.otp_expiry > Date.now()) {
            admin.ad_otp = "" ;
            await admin.save() ; 
            return NextResponse.json({message:"Admin verified successfully" ,success:true},{status:200});  
            } else {
                return NextResponse.json({message:"otp expired" ,success:false},{status:400}); 
            }
        }

    } catch (error) { 
        console.log(`error in otp sending or verifucation ${error}`) ;
    }
}