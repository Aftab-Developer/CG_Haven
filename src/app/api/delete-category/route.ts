
import { Category, category_model } from "@/models/Assests/CategoryMode";
import { sub_category_model } from "@/models/Assests/sub_categoryModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest) {
    try {
        await dbConnect() ; 
        const {searchParams} = request.nextUrl ;
        const decodeCategoryId = decodeURIComponent(searchParams.get('id') as string) ; 
        if(!decodeCategoryId) {
             return NextResponse.json({message:"id is must"},{status:400})
        } 
        const isCategoryExsists = await category_model. find({_id:decodeCategoryId}) ; 
        if(!isCategoryExsists) {
            return NextResponse.json({message:"No result found"},{status:400})
        }   
        if(isCategoryExsists[0].sub_categories.length != 0) {
          return NextResponse.json({message:"please delete all the data releated to the sub-category"},{status:400})
        }
         
       const isCategoryDeleted = await category_model.deleteOne({_id:decodeCategoryId}) ;   

       if(!isCategoryDeleted) {
        return NextResponse.json({message:"Document not deleted"},{status:400})
       } 

         if(isCategoryExsists[0].sub_categories.length != 0) {
       isCategoryExsists[0].sub_categories.forEach(async (e:Category) => {
         await category_model.deleteMany({_id:e._id}) ; 
         await sub_category_model.deleteMany({_id:e._id}) ;
       })
    }

       return NextResponse.json({message:`${isCategoryExsists[0].ca_name } is deleted `},{status:400})

    } catch (error) {
        console.log(`some errror in deleting category ${error}`);
        
    }
}