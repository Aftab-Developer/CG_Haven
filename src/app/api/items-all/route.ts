
import { sub_category_model } from "@/models/Assests/sub_categoryModel";
import { type_model } from "@/models/Assests/typeModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();

        const type_details = await type_model.find({})
        .select("type_name -_id").
        populate({
            path:"documents_collection" ,
            model:"Documents_datas_Table",
            populate:{
                path:"items_files"
            }
        }) ;
    
      
        if (type_details.length === 0) {
            return NextResponse.json({ message: "No Type found", success: false }, { status: 400 });
        }

        return NextResponse.json({ message: "Here is all Types data", success: true , type_details }, { status: 200 });
    } catch (error) {
        console.error("Error fetching Types data:", error);
        return NextResponse.json({ message: "Error getting Types data", success: false }, { status: 500 });
    }
}
