import prisma from '../utils/client.js';

async function manualSeed() {
  await prisma.$transaction(async (tx) => {
    const mandatory = await tx.tb_mandatory_leave.create({
      data: {
        title: 'Hari Keselamatan Kerja',
        duration: 1,
        description: 'Libur wajib dalam rangka pelatihan keselamatan kerja.',
      },
    });

    const special = await tx.tb_special_leave.create({
      data: {
        title: 'Cuti Melahirkan',
        applicable_gender: 'f',
        duration: 90,
        description: 'Cuti khusus untuk karyawan perempuan yang melahirkan.',
      },
    });

    const users = [
      {
        NIK: '100001',
        fullname: 'Rani Kontrak',
        email: 'rani.kontrak@perusahaan.com',
        password: 'Rani1234!',
        gender: 'female',
        role: 'karyawan_kontrak',
        join_date: new Date('2024-01-15'),
        amount: 10,
        expired_month: 2,
      },
      {
        NIK: '100002',
        fullname: 'Budi Tetap',
        email: 'budi.tetap@perusahaan.com',
        password: 'Budi1234!',
        gender: 'male',
        role: 'karyawan_tetap',
        join_date: new Date('2023-11-01'),
        amount: 18,
        expired_month: 24,
      },
      {
        NIK: '100003',
        fullname: 'Tina Magang',
        email: 'tina.magang@perusahaan.com',
        password: 'Tina1234!',
        gender: 'female',
        role: 'magang',
        join_date: new Date('2025-06-01'),
        amount: 5,
        expired_month: 2,
      },
      {
        NIK: '100004',
        fullname: 'Andi Admin',
        email: 'andi.admin@perusahaan.com',
        password: 'Admin123!',
        gender: 'male',
        role: 'admin',
        join_date: new Date('2024-09-15'),
        amount: 15,
        expired_month: 24,
      },
      {
        NIK: '100005',
        fullname: 'Sari Super',
        email: 'sari.super@perusahaan.com',
        password: 'Super123!',
        gender: 'female',
        role: 'super_admin',
        join_date: new Date('2023-01-10'),
        amount: 20,
        expired_month: 24,
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
          amount: user.amount,
          receive_date: new Date('2025-01-01'),
          expired_date: new Date(new Date('2025-01-01').setMonth(new Date('2025-01-01').getMonth() + user.expired_month)),
          NIK: user.NIK,
        },
      });

      await tx.tb_balance_adjustment.create({
        data: {
          adjustment_value: 2,
          notes: 'Penyesuaian cuti awal tahun',
          created_at: new Date(),
          actor: 'admin_hrd',
          NIK: user.NIK,
        },
      });

      const personal = await tx.tb_leave.create({
        data: {
          title: 'Keperluan Pribadi Awal Tahun',
          leave_type: 'personal_leave',
          start_date: new Date('2025-01-10'),
          end_date: new Date('2025-01-10'),
          total_days: 1,
          reason: 'Urusan keluarga',
          status: 'approved',
          created_at: new Date(),
          NIK: user.NIK,
        },
      });

      await tx.tb_leave_log.create({
        data: {
          old_status: 'pending',
          new_status: 'approved',
          reason: 'Disetujui HRD',
          changed_at: new Date(),
          changed_by_nik: user.NIK,
          id_leave: personal.id_leave,
        },
      });

      const mandatoryLeave = await tx.tb_leave.create({
        data: {
          title: 'Pelatihan Wajib',
          leave_type: 'mandatory_leave',
          start_date: new Date('2025-04-05'),
          end_date: new Date('2025-04-05'),
          total_days: 1,
          reason: 'Ikut pelatihan internal perusahaan',
          status: 'approved',
          created_at: new Date(),
          NIK: user.NIK,
          id_mandatory: mandatory.id_mandatory,
        },
      });

      await tx.tb_leave_log.create({
        data: {
          old_status: 'pending',
          new_status: 'approved',
          reason: 'Disetujui sistem',
          changed_at: new Date(),
          changed_by_nik: user.NIK,
          id_leave: mandatoryLeave.id_leave,
        },
      });

      if (user.gender === 'female') {
        const specialLeave = await tx.tb_leave.create({
          data: {
            title: 'Cuti Melahirkan Anak Kedua',
            leave_type: 'special_leave',
            start_date: new Date('2025-05-01'),
            end_date: new Date('2025-07-30'),
            total_days: 90,
            reason: 'Proses kelahiran dan pemulihan pasca melahirkan.',
            status: 'approved',
            created_at: new Date(),
            NIK: user.NIK,
            id_special: special.id_special,
          },
        });

        await tx.tb_leave_log.create({
          data: {
            old_status: 'pending',
            new_status: 'approved',
            reason: 'Disetujui oleh supervisor',
            changed_at: new Date(),
            changed_by_nik: user.NIK,
            id_leave: specialLeave.id_leave,
          },
        });
      }
    }
  });
}

manualSeed()
  .then(() => {
    console.log('Success');
    return prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
