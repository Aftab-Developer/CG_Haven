import {z} from "zod"

export const AdminSchema = z.object({
    ad_name: z
      .string()
      .min(3, "Username must be at least 3 characters long.")
      .max(20, "Username must not exceed 20 characters.")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
  
      ad_email: z
      .string()
      .email("Invalid email address."),
  
      ad_password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(100, "Password must not exceed 100 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
  });

  