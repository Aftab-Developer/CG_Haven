import { feedBackModel } from "@/models/feedBack";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        await dbConnect(); 
        const {username,email,feedBackdes} = await request.json() ; 
        if(!username || !email || !feedBackdes){
            return NextResponse.json({message:"all fields are required"},{status:400}) ;
        }
 
        const isCreated =  await feedBackModel.create(
            {username,email,feedBackdes}
        ) ; 
         if(!isCreated) {
            return NextResponse.json({message:"Not created"},{status:400}) ;
         } 
         return NextResponse.json({message:`${username } your feedback submitted`},{status:400}) ;


    } catch (error) {
        console.log(`some error creating feedback ${error}`);
        
    }
}