import prisma from '../utils/client.js';

async function manualSeed() {
  await prisma.$transaction(async (tx) => {
    await tx.tb_leave_log.deleteMany();
    await tx.tb_leave.deleteMany();
    await tx.tb_balance_adjustment.deleteMany();
    await tx.tb_balance.deleteMany();
    await tx.tb_jwt_token.deleteMany();
    await tx.tb_users.deleteMany();
    await tx.tb_special_leave.deleteMany();
    await tx.tb_mandatory_leave.deleteMany();

    const users = [
      {
        NIK: '100001',
        fullname: 'Rani Kontrak',
        email: 'rani.kontrak@perusahaan.com',
        password: 'Rani1234!',
        gender: 'female',
        role: 'karyawan_kontrak',
        join_date: new Date('2024-01-15'),
      },
      {
        NIK: '100002',
        fullname: 'Budi Tetap',
        email: 'budi.tetap@perusahaan.com',
        password: 'Budi1234!',
        gender: 'male',
        role: 'karyawan_tetap',
        join_date: new Date('2023-11-01'),
      },
      {
        NIK: '100003',
        fullname: 'Tina Magang',
        email: 'tina.magang@perusahaan.com',
        password: 'Tina1234!',
        gender: 'female',
        role: 'magang',
        join_date: new Date('2025-06-01'),
      },
      {
        NIK: '100004',
        fullname: 'Andi Admin',
        email: 'andi.admin@perusahaan.com',
        password: 'Admin123!',
        gender: 'male',
        role: 'admin',
        join_date: new Date('2024-09-15'),
      },
      {
        NIK: '100005',
        fullname: 'Sari Super',
        email: 'sari.super@perusahaan.com',
        password: 'Super123!',
        gender: 'female',
        role: 'super_admin',
        join_date: new Date('2023-01-10'),
      },
    ];

    for (const user of users) {
      await tx.tb_users.create({
        data: {
          NIK: user.NIK,
          fullname: user.fullname,
          email: user.email,
          password: user.password,
          gender: user.gender,
          role: user.role,
          join_date: user.join_date,
        },
      });

      await tx.tb_balance.create({
        data: {
          amount: 12,
          receive_date: new Date('2023-01-01'),
          expired_date: new Date('2024-01-01'),
          NIK: user.NIK,
        },
      });

      await tx.tb_balance.create({
        data: {
          amount: 12,
          receive_date: new Date('2024-01-01'),
          expired_date: new Date('2025-01-01'),
          NIK: user.NIK,
        },
      });
    }
  });
}

// Jalankan seed
manualSeed()
  .then(() => {
    console.log('✅ Seed selesai.');
    return prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('❌ Seed gagal:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
