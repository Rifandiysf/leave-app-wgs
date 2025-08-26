import { z } from 'zod/v4';

const leave_type = ['personal_leave', 'mandatory_leave', 'special_leave']
const status = ['approved', 'pending', 'rejected', 'expired']
const gender = ['female', 'male']

export const leaveSchema = z.object({
    id_leave: z.string(),
    title: z.string("title must be string"),
    leave_type: z.enum(leave_type),
    start_date: z.date().min(new Date("1900-01-01"), { error: "start_date is too far behind" }),
    end_date: z.date().min(new Date("1900-01-01"), { error: "start_date is too far behind" }),
    total_days: z.number("total_days must be number"),
    reason: z.string("reason must be string"),
    status: z.enum(status),
    created_at: z.date().min(new Date("1900-01-01"), { error: "start_date is too far behind" }),
    NIK: z.string("NIK must be string")
})

export const userSchema = z.object({
    NIK: z.string("NIK must be string"),
    fullname: z.string("fullname must be string"),
    email: z.email(),
    password: z.string("password must be string"),
    gender: z.enum(gender),
    role_id: z.number(), // Changed from role: z.enum(role)
    status_id: z.number(), // Changed from status_active: z.enum(status_active)
    join_date: z.date().min(new Date("1900-01-01"), { error: "start_date is too far behind" })
})

export const balanceSchema = z.object({
    amount: z.number(),
    receive_date: z.date().min(new Date("1900-01-01"), { error: "start_date is too far behind" }),
    expired_date: z.date().min(new Date("1900-01-01"), { error: "start_date is too far behind" }),
    NIK: z.string()
})

export const leaveLogSchema = z.object({
    id_leave: z.uuid(),
    old_status: z.enum(status),
    new_status: z.enum(status),
    reason: z.string('reason must be string'),
    changed_by_nik: z.string(),
    changed_at: z.date().min(new Date("1900-01-01"), { error: "start_date is too far behind" }),
    balances_used: z.array(),
})