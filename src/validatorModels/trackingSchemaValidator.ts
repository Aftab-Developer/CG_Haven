import { z } from "zod";

export const trackingCodeSchema = z.object({
    trackingCode: z.string()
    .min(1, { message: "Tracking number cannot be empty" })
});

  
