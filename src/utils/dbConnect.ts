import mongoose from "mongoose" ;  
import dotenv from "dotenv" ;
dotenv.config({}) ;

export interface Connection {
    isConnected? : number
} 

let connectionObj:Connection = {} ; 

export async function dbConnect():Promise<void> {
    try {
       if(!connectionObj.isConnected){
          await mongoose.connect(process.env.MONGODB_URI as string) ;  
         connectionObj.isConnected = mongoose.connections[0].readyState ;
       } else {
        console.log("already connected to the data base");
        
       }
    } catch(error){
        console.log(`Failed to connect to the data base ${error}`);
        
    }
}