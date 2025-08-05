import { z } from 'zod';

const leaveRequestSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').optional(),
    leave_type: z.enum(['personal_leave', 'special_leave', 'mandatory_leave']),
    start_date: z.coerce.date().optional(),
    end_date: z.coerce.date().optional(), 
    reason: z.string().min(5, 'Reason must be at least 5 characters').optional(),
    id_special: z.string().optional(),
    id_mandatory: z.string().optional(),
    status: z.enum(['pending', 'approved', 'rejected']).optional(),
}).superRefine((data, ctx) => {
    if (data.leave_type == 'personal_leave' && !data.end_date) {
        ctx.addIssue({
            path: ['end_date'],
            code: z.ZodIssueCode.custom,
            message: 'end_date is required for personal or mandatory leave',
        });
    }
    
    if (data.leave_type === 'mandatory_leave') {
        if (!data.status) {
            ctx.addIssue({
                path: ['status'],
                code: z.ZodIssueCode.custom,
                message: 'status is required for mandatory leave',
            });
        }
        
        if (!data.id_mandatory) {
            ctx.addIssue({
                path: ['id_mandatory'],
                code: z.ZodIssueCode.custom,
                message: 'id_mandatory is required for mandatory leave',
            });
        }
    }
        if (data.leave_type === 'special_leave' && !data.id_special) {
        ctx.addIssue({
            path: ['id_special'],
            code: z.ZodIssueCode.custom,
            message: 'id_special is required for special leave',
        });
    }
});

export default leaveRequestSchema;