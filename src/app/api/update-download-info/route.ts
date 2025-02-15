import { categoryModel } from "@/models/allCategories";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try { 
        const {searchParams} = request.nextUrl ; 
        const decodeId =decodeURIComponent(searchParams.get('id')!) ;  
        if(!decodeId) {
            return NextResponse.json({message:"all fields required"},{status:400}) ; 
        }
        await dbConnect();   
        const find_category = await categoryModel.find({_id:decodeId}) ; 
        if(!find_category) {
            return NextResponse.json({message:"no category find"},{status:400}) ;
        } 
         const updated_count = await categoryModel.updateOne(
            {_id:decodeId} , 
            {downloads : {$inc:1}}
         ) ; 

         if(!updated_count){
            return NextResponse.json({message:"can't updated"},{status:400}) ;
         } 

         return NextResponse.json({message:"updated the download status"},{status:200}) ;

    } catch (error) {
        console.log(`some error in updating ${error}`);
        
    }
}