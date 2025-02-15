import mongoose , {Document,model,Schema} from "mongoose"; 
import { TimeStamps } from "@/models/admin/adminModel"; 
 
export interface Other_Schema extends Document,TimeStamps {
    others_files: string[]
}

const others_schema = new Schema<Other_Schema>({
    others_files : [String]
}) ;

export const other_model = mongoose.models.Others || model<Other_Schema>("Others",others_schema) ;