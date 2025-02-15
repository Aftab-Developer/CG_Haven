import { adminModel } from "@/models/admin/adminModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { sendMail } from "@/helpers/sendMail";
export async function POST(request:NextRequest) {
  try {
    await dbConnect() ; 
    const {ad_email,ad_password} = await request.json() ; 
    const findingAdmin = await adminModel.findOne({ad_email}) ; 
    if(!findingAdmin) {
        return NextResponse.json({message:"invalid credentials ..." ,success:false},{status:400}) ;
    }  
     
    const isPassRight = await bcrypt.compare(ad_password,findingAdmin?.ad_password as string);  
    if(!isPassRight){
        return NextResponse.json({message:"invalid credentials ..." ,success:false},{status:400}) ;
    }  
    if(findingAdmin.ad_otp || !findingAdmin.ad_otp ){ 

      const otp = Math.floor(100000 + Math.random() * 900000).toString();  
      const expiryDate = new Date().setHours(new Date().getHours() + 1) ;
      findingAdmin.ad_otp = otp ; 
      findingAdmin.otp_expiry = expiryDate ; 
      await findingAdmin.save() ;

      const emailRes = await sendMail(findingAdmin.ad_email,otp) ; 
      if(emailRes.success) {
          return NextResponse.json({message:"Mail sent successfully" ,success:true},{status:200}) ;
      } else {
        return NextResponse.json({message:"Mail  sent successfully" ,success:false},{status:500}) ;
    }
    }


    return NextResponse.json({message:"please verify your email",success:true},{status:200}) ;


  } catch (error) {
    console.log(`some error in logging the admin ?? ${error}`)
  }
}