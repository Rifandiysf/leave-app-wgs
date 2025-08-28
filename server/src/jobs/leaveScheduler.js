import cron from 'node-cron';
import prisma from "../utils/client.js";
import { updateLeaveBalance } from '../services/leave/updateLeaveBalance.service.js';
import { expiredLeave } from '../services/leave/expiredLeave.service.js';

// Menjalankan setiap tanggal 1 pukul 00:00 pagi
cron.schedule('0 0 1 * *', async () => {
  console.log('⏳ [Cron] Mulai penambahan cuti otomatis...');

  try {
    const allUsers = await prisma.tb_users.findMany({
      orderBy: {fullname : 'asc'},
      include: {
        tb_roles: true
      }
    });
    console.log(`👤 Total user: ${allUsers.length}`);
    for (const user of allUsers) {
      await updateLeaveBalance(user);
    }
    console.log('[Cron] Penambahan cuti selesai.');
  } catch (error) {
    console.error('[Cron] Gagal memperbarui cuti:', error);
  }
});


// Cron: jalan setiap hari jam 00:00
cron.schedule('0 0 * * *', async () => {
  console.log(`[CRON] Mengecek cuti yang expired...`);
  await expiredLeave();
}, {
  timezone: 'Asia/Jakarta'
});

