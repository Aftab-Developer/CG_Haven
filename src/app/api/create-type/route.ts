import { sub_category_model } from "@/models/Assests/sub_categoryModel";
import { type_model } from "@/models/Assests/typeModel";
import { backblazeUploader } from "@/utils/backBlazeUploader";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        await dbConnect();  
        const data = await request.formData(); 
        const sub_ca_name = data.get("sub_ca_name") ;
        const type_name = data.get("type_name") ;
        const type_des =data.get("type_des") ;
        const type_image =data.get("type_image") as File | null ;
        if(!sub_ca_name || !type_name || !type_des || !type_image) {
            return NextResponse.json({message:"All fileds required",success:false},{status:400}) ; 
        } 
        const sub_ca_doc = await sub_category_model.find({sub_ca_name}) ; 
        if(!sub_ca_doc){
            return NextResponse.json({message:"Subcategory not found",success:false},{status:400}) ; 

        }    
        let imageUrl ;
        if(type_image) {
            imageUrl = await backblazeUploader(type_image , "") 
        }
   const doc = await type_model.create({
     type_name ,
     type_des ,
     type_image : imageUrl
   }); 

     
  await sub_ca_doc[0].type_models_data.push(doc._id) ; 
  await sub_ca_doc[0].save() ;




   return NextResponse.json({message:`A type created with that name ${type_name}`,success:true},{status:200}) ; 

    } catch (error) {
   return NextResponse.json({message:`server error`,success:false},{status:500}) ; 
        
    }
}