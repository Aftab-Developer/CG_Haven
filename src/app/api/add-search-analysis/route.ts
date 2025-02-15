import { searchAnalysisModel } from "@/models/searchAnalysisModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

function dayChecker(dayNumber:number) {
    if(dayNumber == 0){
      return "Sunady"
    }
    if(dayNumber == 1){
      return "Monady"
    } 
    if(dayNumber == 2){
      return "Tuesday"
    }
    if(dayNumber == 3){
      return "Wednesday"
    }
    if(dayNumber == 4){
      return "Thursday"
    }if(dayNumber == 5){
      return "Friday"
    }if(dayNumber == 6){
      return "Satuarday"
    }
 }

export async function POST(request:NextRequest) {
  try {
    await dbConnect() ;
    const {uid , searchQuery ,isAccomplised} = await request.json() ; 
    console.log({uid , searchQuery ,isAccomplised}) 
    if(!uid) return NextResponse.json({message:"All fields required"},{status:400}) ;  

    const monthName = new Date().toLocaleDateString('default',{month:'long'}) ; 
     
    const details = new searchAnalysisModel({
        uid ,
        month: monthName , 
        day: dayChecker(new Date().getDay()) ,
        searchQuery ,
        isAccomplised
    }) ; 
    await details.save() ; 
    return NextResponse.json({message:"One entry added"},{status:200}) ; 
    
  } catch (error) {
    console.log(`some error in storing DAU ${error}`);
    
  }
}