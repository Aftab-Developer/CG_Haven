import { z } from "zod";

export const ItemDetailSchema = z.object({
  type_name: z.string()
    .min(1, "Type name is required")
    .max(100, "Type name must be at most 100 characters"), 
  item_name: z.string()
    .min(1, "Item name is required")
    .max(100, "Item name must be at most 100 characters"),
  item_des: z.string()
    .min(1, "Item description is required")
    .max(500, "Description must be at most 500 characters"),
  isPatreon: z.boolean(),
});
