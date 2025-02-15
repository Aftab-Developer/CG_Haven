import { sub_category_model } from "@/models/Assests/sub_categoryModel";
import {  backblazeUploader } from "@/utils/backBlazeUploader";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest) {
    try {
        await dbConnect() ;
               const data = await request.formData(); 
               const sub_ca_name = data.get('sub_ca_name') as string  || null ;
               const updated_sub_name= data.get('updated_sub_ca_name') as string  || null ;
               const sub_ca_des = data.get('sub_ca_des') as string  || null ;
               const sub_ca_image = data.get('sub_ca_image') as File || null ;   
               
       const sub_category = await sub_category_model.findOne({sub_ca_name:updated_sub_name}) ;
       if(!sub_category) return NextResponse.json({message:"No sub category found",success:false},{status:400}) ;


       if(sub_ca_name) sub_category.sub_ca_name = sub_ca_name ; 
       if(sub_ca_des) sub_category.sub_ca_des = sub_ca_des ; 

       
              if(sub_ca_image) {
                  const res:any = await backblazeUploader(sub_ca_image , "Updated-Assests") ; 
                  sub_category.sub_ca_image = res 
              } 
               
              await sub_category.save() ; 

              return NextResponse.json({message:"sub category is updated",success:true},{status:200}) ; 
      

    } catch (error) {
        console.log(`some error updating sub category ${error}`);
        
    }
}