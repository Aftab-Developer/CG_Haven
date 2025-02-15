import { searchAnalysisModel, SAQ } from "@/models/searchAnalysisModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    await dbConnect();

    let page = 0;
    const limit = 5000;
    let data: SAQ[] = [];
    
    while (true) {
      const datas = await searchAnalysisModel
        .find({})
        .skip(page * limit)
        .limit(limit)
        .select("-_id -__v")
        .lean();

      if (datas.length === 0) break;

      data = data.concat(datas);
      page++;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=data.xlsx",
      },
    });
  } catch (error) {
    console.error("Error generating Excel file:", error);
    return NextResponse.json({ success: false, message: "error" }, { status: 500 });
  }
}