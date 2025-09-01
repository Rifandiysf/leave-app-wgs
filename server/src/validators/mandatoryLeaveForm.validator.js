import { z } from "zod";

export const mandatoryLeaveForm = z.object({
  id_mandatory: z.string().uuid().max(50).optional(),
  title: z.string().max(255, "Maximum title is 255 characters"),
  isActive: z.boolean().optional(),
  start_date: z.string().transform((val) => new Date(val)).optional(),
  end_date: z.string().transform((val) => new Date(val)).optional(),
  description: z.string(),
});

export const mandatoryLeaveFormUpdate = mandatoryLeaveForm.partial();