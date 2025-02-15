import { z } from "zod";

export const sub_cat_schme_validator = z.object({
    ca_name: z
    .string()
    .min(4, {message:"Category Name 4 char required."})
    .max(100, {message:"Category Name must not exceed 100 characters."}),

    sub_ca_name: z
    .string()
    .min(4, {message:"Category Name 4 char required."})
    .max(100, {message:"Category Name must not exceed 100 characters."}),

    sub_ca_des: z
    .string()
    .min(150,{message:"Category Description must be exceed 150 characters."})
    .max(250, {message:"Category Description must not exceed 250 characters."})
});


