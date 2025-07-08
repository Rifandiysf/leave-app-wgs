import { z } from 'zod';

const leaveRequestSchema = z.object({
    title: z.string('kudu string').min(3, 'Title must be at least 3 characters'),
    leave_type: z.enum(['personal_leave', 'mandatory_leave', 'special_leave']),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    reason: z.string().min(5, 'Reason must be at least 5 characters'),
})

export default leaveRequestSchema;