import { contactModel } from "@/models/contactUs";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect(); 
        const allContactUsUsers = await contactModel.find({}).exec() ;  
        if(!allContactUsUsers) return  NextResponse.json({message:"No Contact us users exsists",success:false},{status:400}) ;  
        return  NextResponse.json({message:"Here is all contact us users ...",allContactUsUsers,success:false},{status:400}) ; 
    } catch (error) {
        console.log(`some error in category names ${error}`) ;
        
    }
}