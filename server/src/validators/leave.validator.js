import { z } from 'zod';

const leaveRequestSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').optional(),
    leave_type: z.enum(['personal_leave', 'special_leave']),
    start_date: z.coerce.date(),
    end_date: z.coerce.date().optional(), 
    reason: z.string().min(5, 'Reason must be at least 5 characters').optional(),
    id_special: z.string().optional(),
    id_mandatory: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.leave_type !== 'special_leave' && !data.end_date) {
        ctx.addIssue({
            path: ['end_date'],
            code: z.ZodIssueCode.custom,
            message: 'end_date is required for personal or mandatory leave',
        });
    }
});

export default leaveRequestSchema;
