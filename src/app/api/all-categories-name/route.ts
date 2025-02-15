import { categoryModel } from "@/models/allCategories";
import {  NextResponse } from "next/server";

export async function GET(){  
  try {
    const allCategoryNames = await categoryModel.find({},{ca_name:1}) ;  

    if(!allCategoryNames) return NextResponse.json({message:"no names found",success:false},{status:400}) ;

    return NextResponse.json({message:"Here is all category names",allCategoryNames,success:true},{status:200}) ;
  } catch (error) {
    console.log(`some error in category names ${error}`) ;
  }
 
}

 