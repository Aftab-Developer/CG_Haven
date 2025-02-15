import { category_model } from "@/models/Assests/CategoryMode";
import { sub_category_model } from "@/models/Assests/sub_categoryModel";
import { backblazeUploader } from "@/utils/backBlazeUploader";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const data = await request.formData() ; 
        if(!data) {
            return NextResponse.json({message: "please enter any data"},{status:400}) ; 
        } 
        const ca_name = data.get("ca_name");
        const sub_ca_name = data.get("sub_ca_name");
        const sub_ca_des = data.get("sub_ca_des"); 
        const sub_ca_image = data.get("sub_ca_image") as File | null;  
       
        const isCategorysExsists = await category_model.find({ca_name}) ; 
        if(!isCategorysExsists) {
            return NextResponse.json({message: "Category with this "+ca_name+" not exsists"},{status:400}) ; 
        }  
        if(sub_ca_image) {
            const image_url = await backblazeUploader(sub_ca_image,"") ;
         const doc =   await  sub_category_model.create({
                sub_ca_name ,
                sub_ca_des ,
                sub_ca_image : image_url
            });  
            isCategorysExsists[0].sub_categories.push(doc._id); 
            isCategorysExsists[0].save() ;
            
            return NextResponse.json({message:"created",doc},{status:200})


        }
        

    } catch (error) {
        
    }
}