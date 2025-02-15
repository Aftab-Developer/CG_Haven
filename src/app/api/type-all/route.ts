
import { sub_category_model } from "@/models/Assests/sub_categoryModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();

        const type_details = await sub_category_model.find({})
        .select("sub_ca_name -_id ")
      .populate({
            path: "type_models_data",
            model: "Type_model_Table",
     
        });
    
      
        if (type_details.length === 0) {
            return NextResponse.json({ message: "No Type found", success: false }, { status: 400 });
        }

        return NextResponse.json({ message: "Here is all Types data", success: true , type_details }, { status: 200 });
    } catch (error) {
        console.error("Error fetching Types data:", error);
        return NextResponse.json({ message: "Error getting Types data", success: false }, { status: 500 });
    }
}
