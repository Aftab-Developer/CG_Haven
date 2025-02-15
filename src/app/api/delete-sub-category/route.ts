import { sub_category_model } from "@/models/Assests/sub_categoryModel";
import { dbConnect } from "@/utils/dbConnect";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest) {
    try {
        await dbConnect() ; 
        const {searchParams} =  request.nextUrl ; 
        const decodeDeleteId = decodeURIComponent(searchParams.get("id") as string) ; 
        if(!decodeDeleteId) {
            return NextResponse.json({message:"id is must"},{status:400})
        } 
        const findSubcategory = await sub_category_model.find({_id:decodeDeleteId}); 
        if(!findSubcategory) {
            return NextResponse.json({message:"No result found"},{status:400})
        }  
        console.log(findSubcategory[0].type_models_data) ;
        if(findSubcategory[0].type_models_data.length != 0){
          return NextResponse.json({message:"please delete all the data releated to the sub-category"},{status:400})
            

        }
        const isDeleteSubCategory = await sub_category_model.deleteOne({_id:decodeDeleteId}); 
        if(!isDeleteSubCategory) {
            return NextResponse.json({message:"Document not deleted"},{status:400})
        }  
        await mongoose.model('Category_model').updateOne(
            {sub_categories :decodeDeleteId} ,
            {$pull: {sub_categories:decodeDeleteId}}
        )
        return NextResponse.json({message:` ${findSubcategory[0].sub_ca_name} sub-category deleted`},{status:200})
    } catch (error) {
        console.log(`error in dekeing sub categoey ${error}`);
        
    }
}