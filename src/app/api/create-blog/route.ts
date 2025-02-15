import { blogModel } from "@/models/blogModel";
import { cloudinaryUpload } from "@/utils/backBlazeUploader";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        await dbConnect() ; 
        const data = await request.formData() ; 
        const blog_title = data.get("blog_title") as string | null  ; 
        const blog_des = data.get("blog_des") as string | null ; 
        const blog_image = data.get("blog_image") as File  ; 
       if(!blog_title || !blog_des || !blog_image ) return 
       NextResponse.json({message:"all fields required",success:false},{status:400}) ; 
       
       const url:any = await cloudinaryUpload(blog_image,"AmmarAssest") ; 
       await blogModel.create({
        blog_title ,
        blog_des ,
        blog_image :  url.secure_url
       }) ; 

    return NextResponse.json({message:"Blog created ...",success:true},{status:200}) ;

    } catch (error) {
        console.log(`error in creating blog ${error}`);
    }
}