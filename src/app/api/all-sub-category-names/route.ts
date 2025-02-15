import { sub_categoryModel } from "@/models/SubCategoryModel";
import {  NextResponse } from "next/server";

export async function GET(){  
  try {
    const allSubCategoryNames = await sub_categoryModel.find({},{ca_name:1}) ;  

    if(!allSubCategoryNames) return NextResponse.json({message:"no names found",success:false},{status:400}) ;

    return NextResponse.json({message:"Here is all sub category names",allSubCategoryNames,success:true},{status:200}) ;
  } catch (error) {
    console.log(`some error in sub category names ${error}`) ;
  }
 
}

 