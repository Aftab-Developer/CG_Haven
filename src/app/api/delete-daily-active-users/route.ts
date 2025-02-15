import { daily_active_users_model } from "@/models/searchAnalysisModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest) {
    try {
        await dbConnect(); 
        const {searchParams} = await request.nextUrl; 
        const id = searchParams.get('id'); 
        if(!id) {
            return NextResponse.json({message:"id is required"},{status:400}); 

        } 

        const decodeId = decodeURIComponent(id!) ; 
        const data = await daily_active_users_model.find({_id:decodeId}); 
        if(!data){
            return NextResponse.json({message:"No info here ..."},{status:400}); 

        } 
        const delete_dau_info = await daily_active_users_model.deleteOne({_id:decodeId}); 
        if(!delete_dau_info) {
            return NextResponse.json({message:"Not Deleted..."},{status:400}); 

        } 
        return NextResponse.json({message:"deleted successfully ..."},{status:200}) ;
    } catch (error) {
        console.log(`some error in deletinf DAU info ${error}`);
        
    }
}