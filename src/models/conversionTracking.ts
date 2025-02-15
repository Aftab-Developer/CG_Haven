import mongoose from 'mongoose' 
import { TimeStamps } from './admin/adminModel';

export interface Tracking_Code extends Document ,TimeStamps {
  trackingCode :string
} 
const trackingCodeSchema = new mongoose.Schema<Tracking_Code>({
   trackingCode : {
     type : String ,
     required: true
   }
}) ;

export const trackingModel  = mongoose.models.TrackingCodeCollection as mongoose.Model<Tracking_Code>|| await mongoose.model<Tracking_Code>('TrackingCodeCollection',trackingCodeSchema);