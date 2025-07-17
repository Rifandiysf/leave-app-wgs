import { z } from 'zod/v4'

const updateLeaveRequestSchema = z.object({
    status: z.enum(['rejected', 'approved']),
    reason: z.string().max(255)
})

export default updateLeaveRequestSchema;