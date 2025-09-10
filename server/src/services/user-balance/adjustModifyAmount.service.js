import prisma from "../../utils/client.js";
import { createDateFromString } from "../../utils/leaves.utils.js";

export const adjustModifyAmount = async (nik, adjustment_value, notes, actor, targetRole, leave_type, operation) => {
    if (!leave_type || !['this_year_leave', 'last_year_leave', 'last_two_year'].includes(leave_type)) {
        throw new Error("Parameter 'leave_type' harus 'this_year_leave' | 'last_year_leave' | 'last_two_year'");
    }
    if (!operation || (operation !== 'add_amount' && operation !== 'reduce_amount')) {
        throw new Error("Parameter 'operation' harus 'add_amount' atau 'reduce_amount'");
    }
    if (actor?.nik === nik) {
        throw new Error('You are not allowed to add your own leave balance');
    }
    if (targetRole === 'magang') {
        throw new Error('Cannot adjust leave balance for intern');
    }

    const currentYear = new Date().getFullYear();
    const today = new Date();
    const targetYear = 
        leave_type === 'last_year_leave'
        ? currentYear - 1
        : leave_type === 'last_two_year'
        ? currentYear - 2
        : currentYear;

    let balance;
    const startOfYear = new Date(`${targetYear}-01-01`);
    const endOfYear = new Date(`${targetYear}-12-31`);
    balance = await prisma.tb_balance.findFirst({
        where: {
            NIK: nik,
            receive_date: {
                gte: startOfYear,
                lte: endOfYear
            }
        }
    });

    if (leave_type === 'last_two_year') {
        if (!balance) {
            throw new Error (`There is no balance for ${targetYear}`)
        }
        if (balance.expired_date <= today) {
            throw new Error(`Balance ${targetYear} has expired, cannot be adjusted`)
        } 
    }
    

    if (!balance) {
        const newBalanceData = {
            NIK: nik,
            amount: operation === "reduce_amount" ? -Math.abs(adjustment_value) : adjustment_value,
            receive_date: new Date(`${targetYear}-01-01`),
            expired_date: new Date(`${targetYear + 2}-04-01`),
        };

        const [newBalance, adjustmentLog] = await prisma.$transaction([
            prisma.tb_balance.create({ data: newBalanceData }),
            prisma.tb_balance_adjustment.create({
                data: {
                    adjustment_value: operation === "reduce_amount" ? -Math.abs(adjustment_value) : adjustment_value,
                    notes,
                    actor: actor.name,
                    NIK: nik,
                    created_at: createDateFromString(new Date()),
                    id_balance: balance.id_balance,
                    balance_year: balance.receive_date.getFullYear()
                }
            })
        ]);
        return [newBalance, adjustmentLog];
    }

    const updatedAmount = await prisma.$transaction([
        prisma.tb_balance.update({
            where: { id_balance: balance.id_balance },
            data: {
                amount:
                    operation === "add_amount"
                        ? { increment: adjustment_value }
                        : { decrement: adjustment_value },
                
            }
        }),
        prisma.tb_balance_adjustment.create({
            data: {
                adjustment_value: operation === "reduce_amount" ? -Math.abs(adjustment_value) : adjustment_value,
                notes,
                actor: actor.name,
                NIK: nik,
                created_at: createDateFromString(new Date()),
                id_balance: balance.id_balance,
                balance_year: balance.receive_date.getFullYear()
            }
        })
    ]);

    return updatedAmount;
};
