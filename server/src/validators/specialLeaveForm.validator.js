import { z } from "zod";

export const specialLeaveForm = z.object({
  id_special: z.string().uuid().max(50).optional(), 
  title: z.string().max(255, "Maximum title 255 characters"),
  applicable_gender: z.enum(["m", "f", "mf"], {
    required_error: "Gender must be selected",
  }),
  duration: z.number().int().min(1, "Minimum duration 1 day").max(365, "Maximum duration 365 days"),
  type: z.enum(["day", "month"], {
    required_error: "Type must be selected",
  }),
  is_active: z.boolean().optional(),
  description: z.string(),
});

export const specialLeaveFormUpdate = specialLeaveForm.partial();
