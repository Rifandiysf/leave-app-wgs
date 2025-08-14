import cron from 'node-cron';
import prisma from '../utils/client.js';
import { createLeave } from '../services/user.service.js';


cron.schedule('0 0 * * *', async () => {
    console.log("[CRON] Running auto mandatory leave check...");

    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + 6);
    targetDate.setHours(0, 0, 0, 0);

    const startOfTargetDay = new Date(targetDate);
    const endOfTargetDay = new Date(targetDate);
    endOfTargetDay.setHours(23, 59, 59, 999);

    console.log(`Target H-7 date: ${targetDate.toISOString().split('T')[0]}`);

    try {
        const upcomingMandatoryLeaves = await prisma.tb_mandatory_leave.findMany({
            where: {
                start_date: {
                    gte: startOfTargetDay,
                    lte: endOfTargetDay
                },
                is_active: true
            }
        });

        console.log(`Found ${upcomingMandatoryLeaves.length} mandatory leaves starting on H-7`);

        for (const mandatory of upcomingMandatoryLeaves) {
            console.log(`Processing mandatory leave: ${mandatory.title}, start_date: ${mandatory.start_date}`);

            const allUsers = await prisma.tb_users.findMany({
                where: {
                    status_active: 'active'
                },
                select: {
                    NIK: true
                }
            });

            let createdCount = 0;

            for (const user of allUsers) {
                const existingLeave = await prisma.tb_leave.findFirst({
                    where: {
                        id_mandatory: mandatory.id_mandatory,
                        NIK: user.NIK
                    }
                });

                if (!existingLeave) {
                    try {
                        await createLeave({
                            title: mandatory.title,
                            leave_type: 'mandatory_leave',
                            NIK: user.NIK,
                            id_mandatory: mandatory.id_mandatory,
                            status: 'approved'
                        });
                        createdCount++;
                        console.log(`[AUTO] Created leave for NIK: ${user.NIK}`);
                    } catch (error) {
                        console.error(`[ERROR] Failed to create leave for NIK: ${user.NIK}`, error.message);
                    }
                }
            }

            console.log(`[SUMMARY] Auto-created ${createdCount} leave entries for mandatory: ${mandatory.title}`);
        }
    } catch (error) {
        console.error("[CRON ERROR] Error during auto mandatory leave check:", error.message);
    }
});

