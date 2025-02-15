import { z } from "zod";

const UpdateSubCategorySchema = z.object({
  sub_ca_name: z.string().min(1, "please enter the sub_ca_name"),
  sub_ca_des: z.string().min(1, "please enter the sub_ca_des"),
  updated_sub_ca_name: z.string().min(1, "please enter the updated_sub_ca_name"),
});

export default UpdateSubCategorySchema;
