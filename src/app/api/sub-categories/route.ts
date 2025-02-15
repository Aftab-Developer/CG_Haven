import { category_model } from "@/models/Assests/CategoryMode";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();

        const sub_ca_details = await category_model.find({}).select(['ca_name','-_id']).populate({
            path: "sub_categories",
            model: "Sub_category_model_data",
           
        });
    
      
       
        if (sub_ca_details.length === 0) {
            return NextResponse.json({ message: "No sub categories found", success: false }, { status: 400 });
        }

        return NextResponse.json({ message: "Here is all sub category data", success: true , sub_ca_details }, { status: 200 });
    } catch (error) {
        console.error("Error fetching sub category data:", error);
        return NextResponse.json({ message: "Error getting category data", success: false }, { status: 500 });
    }
}
