import { banner_model } from "@/models/bannerInfo";
import { cloudinaryUpload } from "@/utils/backBlazeUploader";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest) {
    try {
        await dbConnect(); 
        const data = await request.formData(); 
        const title = data.get('title');
        const description = data.get('description');
        const image_url = data.get('image_url') as File ; 

        if(!title && !description && !image_url) {
            return NextResponse.json({message:"no changes caught"},{status:400}); 
        }  
        
        const document = await banner_model.find({}); 

        if(image_url){
        const url:any = await cloudinaryUpload(image_url ,"AmmarAssest") ; 
        document[0].image_url = url.secure_url ;
        }

       if(title){
        document[0].title = title as string ;
       } 

       if(description){
        document[0].description = description as string ;
       }

       await document[0].save() ;
       
          return NextResponse.json({message:"Updated the banner ..."},{status:200}); 



    } catch (error) {
        console.log(`some error in updating banner ${error}`);
        
    }
}



