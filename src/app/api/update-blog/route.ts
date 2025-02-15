import { blogModel } from "@/models/blogModel";
import { cloudinaryUpload } from "@/utils/backBlazeUploader";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest) {
    try {
        await dbConnect() ;  
        const {searchParams} = request.nextUrl ;
        const blogId = searchParams.get('blogId') ;  
        if(!blogId) return NextResponse.json({message:"please give blog id"},{status:400}) ;
        const decodeBlogId = decodeURIComponent(blogId as string)


        const data = await request.formData(); 
        const blog_title = data.get('blog_title') as string  || null ;
        const blog_des = data.get('blog_des') as string  || null ;
        const blog_image = data.get('blog_image') as File || null ; 

        if(!blog_title || !blog_des ||  !blog_image) return NextResponse.json({message:"all field required"},{status:400}) ;   
       
        const blog = await blogModel.find({_id:decodeBlogId}) ; 
        if(!blog) return NextResponse.json({message:"No blogs find"},{status:400}) ; 

        if(blog_title) blog[0].blog_title = blog_title ; 
        if(blog_des) blog[0].blog_des = blog_des ; 
        
        if(blog_image) {
            const res:any = await cloudinaryUpload(blog_image , "AmmarAssest") ; 
            blog[0].blog_image = res.secure_url 
        } 

        await blog[0].save() ; 

        return NextResponse.json({message:"Blog is updated"},{status:200}) ; 

    } catch (error) {
        console.log(`some updation error in blogs ${error}`)
    }
}