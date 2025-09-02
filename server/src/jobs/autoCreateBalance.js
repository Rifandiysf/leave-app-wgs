import cron from 'node-cron';
import prisma from "../utils/client.js";

cron.schedule('0 0 * * *', async () => {
    console.log('⏳ [Cron] Mulai cek balance...');

    try {
        const targetYear = new Date().getFullYear();
        const startOfYear = new Date(`${targetYear}-01-01`);
        const endOfYear = new Date(`${targetYear + 2}-12-31`);
        console.log(targetYear)
        console.log(startOfYear)
        console.log(endOfYear)

        const users = await prisma.tb_users.findMany({
            include: { tb_statuses: true }
        });

        const filteredUsers = users.filter(user => user.tb_statuses.name !== 'Magang' && user.isActive === true);

        for (const user of filteredUsers) {
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
                    expired_date: new Date(`${targetYear + 2}-01-01`)
                };

                const [newBalance, adjustmentLog] = await prisma.$transaction([
                    prisma.tb_balance.create({ data: newBalanceData }),
                    prisma.tb_balance_adjustment.create({
                        data: {
                            adjustment_value,
                            notes,
                            actor,
                            NIK: nik,
                            created_at: new Date(),
                            balance_year: targetYear
                        }
                    })
                ]);

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
