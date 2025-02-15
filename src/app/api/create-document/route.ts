import { documents_model } from "@/models/Assests/Document";
import { File_Details, file_model } from "@/models/Assests/FilesModel";
import { type_model } from "@/models/Assests/typeModel";
import { backblazeUploader } from "@/utils/backBlazeUploader";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
    try {
        await dbConnect(); 
//   All data form form Data 
       const data = await request.formData(); 
       const type_name = data.get("type_name") ;
       const item_name = data.get("item_name") ;
       const item_des = data.get("item_des") ;
       const item_image = data.get("item_image") as File;
       const isPatreon = data.get("isPatreon") ; 
       const uploadedFiles = data.getAll("files") as File[]; 
       const othersFiles = data.getAll("others") as File[]; 

    //    All required Fields
       if(!type_name || !item_name || !item_des ||!item_image || !isPatreon ||!uploadedFiles){
        return NextResponse.json({message:"All fields are required",success:false},{status:400}) ;
       }  ; 
   
       console.log(type_name);
    //    Type Check if exsists 

       const isTypeExsists = await type_model.findOne({type_name}) ; 
       if(!isTypeExsists) {
        return NextResponse.json({message:`Type with the name ${type_name} not exsists`,success:false},{status:400}) ;
       }  

    //    item image url 
    const item_image_url = await backblazeUploader(item_image as File ,"") ;
     
    //    Others Section

       const otherFilesArray:string[] = [] ; 

       if(othersFiles) {     
        othersFiles.forEach( async (file) => {
             let urls = await backblazeUploader(file , "Others") ; 
             otherFilesArray.push(urls) ;
          }) ;

       }
 

       const qualityChecker = (file: File) => {
            const size = file.size;
            if (size > 15000000) return "16k";
            if (size > 10000000) return "8k";
            if (size > 5000000) return "5k";
            if (size > 2000000) return "4k";
            if (size > 1000000) return "2k";
            return "1k";
        };    
    
        const fileData = await Promise.all(
            uploadedFiles.map(async (file) => {
                if (file instanceof File) {
                    const quality = qualityChecker(file);
                    const uploadedUrl = await backblazeUploader(file, ""); 
                    const extension = path.extname(file.name); 
                    return { fileName: file.name, quality, uploadedUrl, extension };
                }
            })
        );

        
        const groupedData = new Map<string, File_Details[]>();
        fileData.forEach((file) => {
            if (file) {
                if (!groupedData.has(file.extension)) {
                    groupedData.set(file.extension, []);
                }
                groupedData.get(file.extension)?.push(file as File_Details);
            }
        }); 


        const groupedObject = Object.fromEntries(groupedData); 
 
      
        const fileSaved = await file_model.create({ files: groupedObject }); 
        
        const awaitedOtherFileds = await Promise.all(otherFilesArray) ;

            const doc =  await documents_model.create({
                doc_name: item_name,
                doc_des: item_des,
                doc_name_image: item_image_url,
                isPatreon,
                items_files: fileSaved._id,
                others: awaitedOtherFileds
            }); 
            console.log(isTypeExsists) ; 

            isTypeExsists.documents_collection.push(doc._id) ;
           console.log(isTypeExsists) ; 
           await isTypeExsists.save() ; 
        return NextResponse.json(
            { message: "One Item Created "+ item_name},
            { status: 200 }
        );
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json(
            { message: "Error uploading files", error },
            { status: 500 }
        );
    }
}