import { adminModel } from "@/models/admin/adminModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { backblazeUploader } from "@/utils/backBlazeUploader";
export async function PATCH(request:NextRequest) {
  try {
    await dbConnect() ; 
    
    const data = await request.formData() ; 
    const ad_name = data.get("ad_name") as string | null ;
    const ad_email = data.get("ad_email") as string | null ; 
    const ad_password = data.get("ad_password") as string | null ; 
    const ad_profile_img = data.get("ad_profile_img") as File  ; 
    const ad_banner_image = data.get("ad_banner_image") as File  ; 
    const ad_bio = data.get("ad_bio") as string  ; 
   
    if(!ad_name && !ad_bio && !ad_email && !ad_password && !ad_profile_img && !ad_banner_image)
{
  return NextResponse.json({message:"Plese update at least one field",success:false},{status:400})
}
    const adminDocument = await adminModel.find({}) ; 
    if(!adminDocument) return NextResponse.json({message:"No admin ...",success:false},{status:400}) ;  

    if(ad_name) adminDocument[0].ad_name = ad_name ;
    if(ad_bio) adminDocument[0].ad_bio = ad_bio ;

    if(ad_profile_img){ 
      const url:any = await backblazeUploader(ad_profile_img,"admin-profile") ; 
       adminDocument[0].ad_profile_img = url ;
      }; 

      if(ad_banner_image){ 
        const url:any = await backblazeUploader(ad_banner_image,"admin-profile") ; 
         adminDocument[0].ad_banner = url ;
        }; 

    if(ad_email) adminDocument[0].ad_email = ad_email ;
    
    if(ad_bio) adminDocument[0].ad_bio = ad_bio ;
    if(ad_password){ 
      const newHashedPass = await bcrypt.hash(ad_password,10) ; 
       adminDocument[0].ad_password = newHashedPass ; 
    }

    adminDocument[0].save() ; 
    return NextResponse.json({message:"Admin profile updated ...",adminDocument,success:true},{status:200}) ;
        
  } catch (error) {
    console.log(`some error in logging the admin ?? ${error}`);
    
  }
}