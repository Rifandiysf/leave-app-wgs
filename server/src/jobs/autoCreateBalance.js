import cron from 'node-cron';
import prisma from "../utils/client.js";

cron.schedule('0 0 * * *', async () => {
    console.log('⏳ [Cron] Mulai cek balance...');

    try {
        const targetYear = new Date().getFullYear();
        const startOfYear = new Date(`${targetYear}-01-01`);
        const endOfYear = new Date(`${targetYear}-12-31`);

        const users = await prisma.tb_users.findMany({
            select: { NIK: true },
            where: {
                NOT : {
                    role: 'magang'
                }
            }
        });

        for (const user of users) {
            const nik = user.NIK;

            const balance = await prisma.tb_balance.findFirst({
                where: {
                    NIK: nik,
                    receive_date: {
                        gte: startOfYear,
                        lte: endOfYear
                    }
                }
            });

            if (!balance) {
                const adjustment_value = 0;
                const notes = "Auto generate balance";
                const actor = "system";

                const newBalanceData = {
                    NIK: nik,
                    amount: adjustment_value,
                    receive_date: startOfYear,
                    expired_date: new Date(`${targetYear + 2}-01-01`),
                };

                const result = await prisma.$transaction(async (tx) => {
                    const newBalance = await tx.tb_balance.create({
                        data: newBalanceData
                    });

                    const adjustmentLog = await tx.tb_balance_adjustment.create({
                        data: {
                            adjustment_value,
                            notes,
                            actor,
                            NIK: nik,
                            balance_year: targetYear,
                            id_balance: newBalance.id_balance, // relasi balance yang dibuat di atas
                            created_at: new Date()
                        }
                    })

                    return { newBalance, adjustmentLog };
                });

                console.log(`✅ Balance baru dibuat untuk NIK: ${nik}`);
            } else {
                console.log(`ℹ️ Balance sudah ada untuk NIK: ${nik}`);
            }
        }

        console.log('[Cron] Penambahan balance selesai.');
    } catch (error) {
        console.error('[Cron] Gagal membuat balance:', error);
    }
});
