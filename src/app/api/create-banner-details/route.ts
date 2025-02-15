import { banner_model } from "@/models/bannerInfo";
import { cloudinaryUpload } from "@/utils/backBlazeUploader";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { resolve } from "path";

export async function POST(request:NextRequest) {
    try {
        await dbConnect(); 
        const data = await request.formData(); 
        const title = data.get('title');
        const description = data.get('description');
        const image_url = data.get('image_url') as File | null; 

        if(!title || !description || !image_url) {
            return NextResponse.json({message:"all fields required"},{status:400}); 
        }  

        const url:any = await cloudinaryUpload(image_url ,"AmmarAssest") ; 

        const createdBanner = await banner_model.create({
            title ,
            description ,
            image_url : url.secure_url
          });  
       
          return NextResponse.json({message:"created the banner "},{status:200}); 



    } catch (error) {
        console.log(`some error in creating banner ${error}`);
        
    }
}



