import { blogModel } from "@/models/blogModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try { 
        await dbConnect() ;
        const {searchParams} = request.nextUrl 
        if(!searchParams.get('limit')){
            const blogs = await blogModel.find({}).limit(20).exec() ; 
            if(!blogs) {
                return NextResponse.json({message:"No blogs to show ...",success:false},{status:400}) 
            };  
             
            return NextResponse.json({message:"here is all blogs show ...",blogs,success:true},{status:200}) ;

        } 
        const decodeSkip = decodeURIComponent(searchParams.get('limit') as string) ; 

          const blogs = await blogModel.find({}).skip(parseInt(decodeSkip)).limit(20).exec() ; 
            if(!blogs) {
                return NextResponse.json({message:"No blogs to show ...",success:false},{status:400}) 
            };  
             
            return NextResponse.json({message:"here is all blogs show ...",blogs,success:true},{status:200}) ;

        
    } catch (error) {
        console.log(`error in creating blog ${error}`);
        
    }
}