import { sub_category_model } from "@/models/Assests/sub_categoryModel";
import { type_model } from "@/models/Assests/typeModel";
import {  backblazeUploader } from "@/utils/backBlazeUploader";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest) {
    try {
        await dbConnect() ;
               const data = await request.formData(); 
               const type_name = data.get('type_name') as string  || null ;
               const type_des= data.get('type_des') as string  || null ;
               const type_image = data.get('type_image')as File || null ; 
               const updated_type_name = data.get('updated_type_name')  as string  || null ;  
               
       const type_found = await type_model.findOne({type_name:updated_type_name}) ;
       if(!type_found) return NextResponse.json({message:"No Type found"},{status:400}) ;


       if(type_name) type_found.type_name = type_name ; 
       if(type_des) type_found.type_des = type_des ; 

       
              if(type_image) {
                  const res:any = await backblazeUploader(type_image , "Updated-Assests") ; 
                  type_found.type_image = res 
              } 
               
              await type_found.save() ; 

              return NextResponse.json({message:"Type is updated"},{status:200}) ; 
      

    } catch (error) {
        console.log(`some error updating type ${error}`);
        
    }
}