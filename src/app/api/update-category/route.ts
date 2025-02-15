import { category_model } from "@/models/Assests/CategoryMode";
import {  backblazeUploader } from "@/utils/backBlazeUploader";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest) {
    try {
        await dbConnect() ;
               const data = await request.formData(); 
               const ca_name = data.get('ca_name') as string  || null ;
               const updated_name= data.get('updated_name') as string  || null ;
               const ca_des = data.get('ca_des') as string  || null ;
               const ca_image = data.get('ca_image') as File || null ;   
               

       const category = await category_model.findOne({ca_name:updated_name}) ;
       if(!category) return NextResponse.json({message:"No category found",success:false},{status:400}) ;


       if(ca_name) category.ca_name = ca_name ; 
       if(ca_des) category.ca_des = ca_des ; 

       
              if(ca_image) {
                  const res:any = await backblazeUploader(ca_image , "Updated-Assests") ; 
                  category.ca_image = res 
              } 
               
              await category.save() ; 

              return NextResponse.json({message:"category is updated",success:true},{status:200}) ; 
      

    } catch (error) {
        console.log(`some error updating category ${error}`);
        
    }
}