import { z } from "zod";

export const mandatoryLeaveForm = z.object({
  id_mandatory: z.string().uuid().max(50).optional(),
  title: z.string().max(255, "Maximum title is 255 characters"),
  duration: z.number().int().min(1, "Minimum duration is 1").max(365),
  is_active: z.boolean().optional(), 
  description: z.string(),
});

export const mandatoryLeaveFormUpdate = mandatoryLeaveForm.partial();

