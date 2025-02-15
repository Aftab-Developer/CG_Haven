import { documents_model } from "@/models/Assests/Document";
import { type_model } from "@/models/Assests/typeModel";
import { dbConnect } from "@/utils/dbConnect"
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(request:NextRequest
) {
    try {
        await dbConnect() ; 
        const {searchParams} = request.nextUrl ;  
        const id = searchParams.get("id"); 
        if(!id) {
            return NextResponse.json({message:"Id is required",success:false},{status:400});
        } 
        const isDocExsistsInTypeModel = await type_model.findOne({_id:id}); 
        if(!isDocExsistsInTypeModel){
            return NextResponse.json({message:"Type with this id not exsists",success:false},{status:400});
        } 
        if(isDocExsistsInTypeModel.documents_collection.length !=0)
        {
            return NextResponse.json({message:"please delete all the documents",success:false},{status:400});
        }
        await type_model.deleteOne({_id:id});  
        
       
      return NextResponse.json({message:`Type ${isDocExsistsInTypeModel[0].type_name} is deleted`,success:true},{status:200})
    } catch (error) {
        console.log("error deleting type")
    }
}