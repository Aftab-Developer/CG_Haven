import { z } from "zod";

export const OtpSchema = z.object({
  otp : z.string({message:"required field"})
  .length(6, "OTP must be exactly 6 digits.")
}); 