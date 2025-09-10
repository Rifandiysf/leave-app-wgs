import { z } from 'zod/v4';

const leave_type = ['personal_leave', 'mandatory_leave', 'special_leave']
const status = ['approved', 'pending', 'rejected', 'expired']
const leave_balances = ['current', 'last_year', 'last_two_year']

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
    isMale: z.boolean(),
    role_id: z.number(), 
    status_id: z.number(), 
    join_date: z.date().min(new Date("1900-01-01"), { error: "start_date is too far behind" })
})

export const balanceSchema = z.object({
    amount: z.number("amount_balance must be number"),
    receive_date: z.date().min(new Date("1900-01-01"), { error: "start_date is too far behind" }),
    expired_date: z.date().min(new Date("1900-01-01"), { error: "start_date is too far behind" }),
    NIK: z.string()
})

export const leaveLogSchema = z.object({
    id_leave: z.string(),
    old_status: z.enum(status),
    new_status: z.enum(status),
    reason: z.string('reason must be string'),
    changed_by_nik: z.string(),
    changed_at: z.date().min(new Date("1900-01-01"), { error: "start_date is too far behind" }),
    balances_used: z.array(),
})

export const balanceAdjustmentSchema = z.object({
    id_adjustment: z.string("id_adjustment must be string"),
    adjustment_value: z.number("adjustment_value must be number"),
    notes: z.string("notes must be string"),
    actor: z.string("actor must be string"),
    NIK: z.string("NIK must be string"),
    balance_year: z.number("balance_year must be number")
})

export const importBalanceAdjustmentSchema = z.object({
    NIK: z.string("NIK must be string"),
    amount: z.number("amount must be number"),
    notes: z.string("notes must be string"),
        leave_balances: z.enum(leave_balances, "Invalid input in the leave_balances column; available options are: current, last_year, last_two_year.")
})

export const validateInjectDataType = (schema, data) => {
    try {
        const result = schema.safeParse(data)
        if (!result.success) {
            console.log(result.error.issues);
            throw result.error.issues?.[0]
        }
    } catch (error) {
        throw error
    }
} 