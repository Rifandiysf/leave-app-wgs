import cron from 'node-cron';
import prisma from "../utils/client.js";
import { updateLeaveBalance } from '../services/leave.service.js';

// Menjalankan setiap tanggal 1 pukul 01:00 pagi
cron.schedule('0 1 1 * *', async () => {
  console.log('⏳ [Cron] Mulai penambahan cuti otomatis...');

  try {
    const allUsers = await prisma.tb_users.findMany();

    for (const user of allUsers) {
      await updateLeaveBalance(user);
    }

    console.log('[Cron] Penambahan cuti selesai.');
  } catch (error) {
    console.error('[Cron] Gagal memperbarui cuti:', error);
  }
});
