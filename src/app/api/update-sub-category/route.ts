import { sub_categoryModel } from "@/models/SubCategoryModel";
import { cloudinaryUpload } from "@/utils/backBlazeUploader";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest) {
     try {
        await dbConnect() ; 
         const {searchParams} = request.nextUrl ;
                       const SubcategoryId = searchParams.get('categoryId') ;  
                       if(!SubcategoryId) return NextResponse.json({message:"please give category  id"},{status:400}) ; 
                       const decodecategoryId = decodeURIComponent(SubcategoryId as string) ; 
        
                       const data = await request.formData(); 
                       const ca_name = data.get('ca_name') as string  || null ;
                       const ca_des = data.get('ca_des') as string  || null ;
                       const ca_image = data.get('ca_image') as File || null ;  
                       const ca_serve_image = data.get('ca_serve_image') as File || null ;     
                       const ca_video = data.get('ca_video') as File || null ;    
       
                if(!ca_name || !ca_des ||  !ca_image || (!ca_serve_image || !ca_video)) return NextResponse.json({message:"all field required"},{status:400}) ;  
                   
                
                       const subCategory = await sub_categoryModel.find({_id:decodecategoryId}) ;
                       if(!subCategory) return NextResponse.json({message:"No sub category find"},{status:400}) ;
              
                    
                           if(ca_name) subCategory[0].ca_name = ca_name ; 
                           if(ca_des) subCategory[0].ca_des = ca_des ; 
                    
                           
                                  if(ca_image) {
                                      const res:any = await cloudinaryUpload(ca_image , "AmmarAssest") ; 
                                      subCategory[0].ca_image = res.secure_url 
                                  }  


                                  if(ca_serve_image) {
                                    const res:any = await cloudinaryUpload(ca_serve_image , "AmmarAssest") ; 
                                    subCategory[0].ca_serve_image = res.secure_url 
                                }   

                                if(ca_video) {
                                    const res:any = await cloudinaryUpload(ca_video , "AmmarAssest") ; 
                                    subCategory[0].ca_video = res.secure_url 
                                }  
                    await subCategory[0].save() ;
                    return NextResponse.json({message:"sub category is updated"},{status:200}) ; 



     } catch (error) {
        console.error(`some error in update category ${error}`);
        
     }


}