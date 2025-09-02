import dotenv from 'dotenv';
dotenv.config();

import { updateLeaveBalance } from '../services/leave/updateLeaveBalance.service.js';
import prisma from '../utils/client.js';


const run = async () => {
  console.log('⏳ [Cron] Mulai penambahan cuti otomatis...');

  try {
    const allUsers = await prisma.tb_users.findMany({
      orderBy: {fullname : 'asc'},
      include: {
        tb_roles: true,
        tb_statuses: true
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
};

run();
