import { documents_model } from "@/models/Assests/Document";
import { file_model } from "@/models/Assests/FilesModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE (request:NextRequest) 
{
  try {
    await dbConnect() ; 
    const {searchParams} = request.nextUrl; 
    const id = decodeURIComponent(searchParams.get('id')!) ;
    if(!id){
      return NextResponse.json({message:"All fields required"},{status:400})
    }
    const isDocExsists = await documents_model.findOne({_id:id}) ; 
    if(!isDocExsists){
      return NextResponse.json({message:"Invalid id"},{status:400})
    } 
    await documents_model.deleteOne({_id:id}) ; 
    
    console.log(isDocExsists.items_files[0]); 
    const idDelete = isDocExsists.items_files[0] ;
    
    await file_model.deleteOne({_id:idDelete}) ;
    
      return NextResponse.json({message:"Deleted the doc "},{status:200})
    
  } catch (error) {
    return NextResponse.json({message:"Un excepted errror "},{status:500})
    
  }
}