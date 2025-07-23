import dotenv from 'dotenv'
dotenv.config()
import prisma from "../utils/client.js";
import { updateLeaveBalance } from '../services/leave.service.js';

(async () => {
  console.log('⏳ [Manual Run] Mulai penambahan cuti otomatis...');
  try {
    const allUsers = await prisma.tb_users.findMany({
        orderBy : {fullname : 'asc'}
    });
    console.log(`👤 Total user: ${allUsers.length}`);
    for (const user of allUsers) {
      console.log(`➡️  Update user: ${user.NIK} - ${user.fullname}`);
      await updateLeaveBalance(user);
    }
    console.log('✅ [Manual Run] Penambahan cuti selesai.');
    process.exit();
  } catch (err) {
    console.error('❌ [Manual Run] Gagal:', err);
    process.exit(1);
  }
})();
