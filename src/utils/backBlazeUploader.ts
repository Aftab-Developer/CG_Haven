
import B2 from 'backblaze-b2';

const b2 = new B2({    
  applicationKeyId: 
  process.env.B2_APPLICATION_KEY_ID!,
  applicationKey: 
  process.env.B2_APPLICATION_KEY!,
});

export const backblazeUploader = async (file: File, folder: string) => {
  try {
    await b2.authorize();
    const { data } = await b2.getUploadUrl({
      bucketId: process.env.B2_BUCKET_ID!,
    });
   
    const buffer = await file.arrayBuffer();
    const bufferData = Buffer.from(buffer);
    const fileName = `${folder}/${file.name}`; 

   await b2.uploadFile({
      uploadUrl: data.uploadUrl,
      uploadAuthToken: data.authorizationToken,
      fileName: fileName,
      data: bufferData,
    }); 
   
    const bucketName = process.env.BUCKET_NAME!;
    const uploadedUrl = `https://f005.backblazeb2.com/file/${bucketName}/${fileName}`; 
    return uploadedUrl ;
  } catch (error) {
    console.error('Error uploading file to Backblaze B2:', error);
    throw error;
  }
};