import { z } from "zod";

export const tutorialSchema = z.object({
  tu_name: z.string().min(1, { message: "Tutorial name is required." }),
  tu_des: z.string().min(1, { message: "Description is required." }),
  tu_links: z
    .array(z.string().url({ message: "Each link must be a valid URL." }))
    .optional(),
  tu_duration: z.string().min(1, { message: "Duration is required." }),
  video_link: z.string().url({ message: "Invalid video URL format." }),
  software_type: z
    .array(z.string().min(1, { message: "Software type cannot be empty." }))
    .nonempty({ message: "At least one software type is required." }),
  tu_type: z
    .array(z.string().min(1, { message: "Tutorial type cannot be empty." }))
    .nonempty({ message: "At least one tutorial type is required." }),

});

