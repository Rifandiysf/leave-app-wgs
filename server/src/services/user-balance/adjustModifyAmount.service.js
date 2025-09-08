import prisma from "../../utils/client.js";

export const adjustModifyAmount = async (nik, adjustment_value, notes, actor, targetRole, leave_type) => {
    if (!leave_type || (leave_type !== 'this_year_leave' && leave_type !== 'last_year_leave')) {
        throw new Error("Parameter 'leave_type' harus 'this_year_leave' atau 'last_year_leave'");
    }
    if (actor?.nik === nik) {
        throw new Error('You are not allowed to add your own leave balance');
    }
    if (targetRole === 'magang') {
        throw new Error('Cannot adjust leave balance for intern');
    }

    const currentYear = new Date().getFullYear();
    const targetYear = (leave_type === 'last_year_leave')
        ? currentYear - 1
        : currentYear;

    let balance;

    if (targetRole === 'karyawan_kontrak') {
        balance = await prisma.tb_balance.findFirst({
            where: {
                NIK: nik,
                receive_date: {
                    gte: new Date(`${targetYear}-01-01`),
                    lte: new Date(`${targetYear}-12-31`),
                }
            },
            orderBy: { receive_date: 'desc' }
        });
    } else {
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
    }

    if (!balance) {
        const newBalanceData = {
            NIK: nik,
            amount: adjustment_value,
            receive_date: new Date(`${targetYear}-01-01`),
            expired_date: new Date(`${targetYear + 2}-01-01`),
        };

        const [newBalance, adjustmentLog] = await prisma.$transaction([
            prisma.tb_balance.create({ data: newBalanceData }),
            prisma.tb_balance_adjustment.create({
                data: {
                    adjustment_value,
                    notes,
                    actor: actor.name,
                    NIK: nik,
                    created_at: new Date()
                }
            })
        ]);
        return [newBalance, adjustmentLog];
    }

    const updatedAmount = await prisma.$transaction([
        prisma.tb_balance.update({
            where: { id_balance: balance.id_balance },
            data: {
                amount: {
                    increment: adjustment_value
                }
            }
        }),
        prisma.tb_balance_adjustment.create({
            data: {
                adjustment_value,
                notes,
                actor: actor.name,
                NIK: nik,
                created_at: new Date(),
                id_balance: balance.id_balance,
                balance_year: balance.receive_date.getFullYear()
            }
        })
    ]);

    return updatedAmount;
};