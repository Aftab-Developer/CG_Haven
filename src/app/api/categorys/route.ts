import { category_model } from "@/models/Assests/CategoryMode";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        await dbConnect(); 
        const categorys = await category_model.find({}) ;  
        if(categorys.length == 0) {
            return NextResponse.json({message: "No categorys to show",success:false},{status:400}) ;
        } 
             return NextResponse.json({message: "Here is all category data",categorys,success:false},{status:400}) ;

    } catch (error) {
        return NextResponse.json({message: "error getting category data",success:false},{status:500}) ;
        
    }
}