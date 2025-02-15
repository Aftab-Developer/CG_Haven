import { contactModel } from "@/models/contactUs";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        await dbConnect(); 
        const {username,email,description} = await request.json() ; 
        if(!username || !email || !description) return NextResponse.json({message:"please give all the data",success:false},{status:400}) ;
         await contactModel.create({
            username ,
            email ,
            description
         }) ; 
         return NextResponse.json({message:`${username} your request is send`,success:true},{status:200}) ;

    } catch (error) {
        console.log(`some error in contact us route ${error}`);
        
    }
}