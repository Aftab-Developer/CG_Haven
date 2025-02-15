
import nodemailer from 'nodemailer';   
import { emailTemplate } from "@/email/emailTemplate";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "cgheven@gmail.com",
    pass: process.env.GMAIL_PASS!,
  },
}); 

export const sendMail = async (to: string,otp:string) => {
    try {
        await transporter.sendMail({
            from : "cgheven@gmail.com",
            to ,
            subject: "Admin Verification", 
            html : emailTemplate(otp)   
        }) ;
        return {success:true , message:"Mail sent successfully"} ;
    } catch (error) {    
        console.log(error) ;
        return {success:false , message:"Mail not sent successfully"} ;
    }
}