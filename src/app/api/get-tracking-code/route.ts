import { trackingModel } from "@/models/conversionTracking";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect() ; 
        const code = await trackingModel.find({}) ; 
        if(!code) {
            return NextResponse.json({message: "no code",success:false},{status:400})
        } 
        return NextResponse.json({message: "here is the code",code:code[0].trackingCode,success:true},{status:200})

    } catch (error) {
        return NextResponse.json({message: "error",success:false},{status:500})

    }
}