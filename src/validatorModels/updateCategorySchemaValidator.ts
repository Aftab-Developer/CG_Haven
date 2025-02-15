import { z } from "zod";

const UpdateCategorySchema = z.object({
  ca_name: z.string().min(1, "please enter the ca_name"),
  ca_des: z.string().min(1, "please enter the ca_des"),
  updated_ca_name: z.string().min(1, "please enter the updated_ca_name"),
});

export default UpdateCategorySchema;
