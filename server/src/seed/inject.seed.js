import { status, status_active } from '../../generated/prisma/index.js';
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
        NIK: '1',
        fullname: 'super admin',
        email: 'superadmin@perusahaan.com',
        password: 'super123!',
        gender: 'male',
        role: 'super_admin',
        status: 'active',
        join_date: new Date('2023-07-01'),
      }
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
          status_active: user.status,
          join_date: user.join_date,
        },
      });

      await tx.tb_balance.create({
        data: {
          amount: 12,
          receive_date: new Date('2024-01-01'),
          expired_date: new Date('2026-01-01'),
          NIK: user.NIK,
        },
      });

      await tx.tb_balance.create({
        data: {
          amount: 12,
          receive_date: new Date('2025-01-01'),
          expired_date: new Date('2027-01-01'),
          NIK: user.NIK,
        },
      });
    }

    const specialLeaves = [
      {
        title: "Cuti Melahirkan",
        applicable_gender: "f",
        duration: 90,
        is_active: true,
        description: "Cuti melahirkan untuk karyawan perempuan",
      },
      {
        title: "Cuti Haid",
        applicable_gender: "f",
        duration: 2,
        is_active: true,
        description: "Cuti haid untuk karyawan perempuan",
      },
      {
        title: "Cuti Menikah",
        applicable_gender: "mf",
        duration: 3,
        is_active: true,
        description: "Cuti menikah untuk karyawan",
      },
      {
        title: "Cuti Menikahkan Anak",
        applicable_gender: "mf",
        duration: 2,
        is_active: true,
        description: "Cuti menikahkan anak untuk karyawan",
      },
      {
        title: "Cuti Mengkhitankan Anak",
        applicable_gender: "mf",
        duration: 2,
        is_active: true,
        description: "Cuti mengkhitankan anak untuk karyawan",
      },
      {
        title: "Cuti Membaptis Anak",
        applicable_gender: "mf",
        duration: 2,
        is_active: true,
        description: "Cuti membaptis anak untuk karyawan",
      },
      {
        title: "Cuti Istri Melahirkan/Keguguran",
        applicable_gender: "m",
        duration: 2,
        is_active: true,
        description: "Cuti karena istri melahirkan atau keguguran",
      },
      {
        title: "Cuti Keluarga Inti Meninggal",
        applicable_gender: "mf",
        duration: 2,
        is_active: true,
        description: "Cuti karena meninggal suami/istri/orang tua/mertua/anak/menantu",
      },
      {
        title: "Cuti Anggota Serumah Meninggalll",
        applicable_gender: "mf",
        duration: 1,
        is_active: true,
        description: "Cuti karena meninggal anggota keluarga serumah",
      },
    ];

    for (const leave of specialLeaves) {
      await tx.tb_special_leave.create({
        data: leave,
      });
    }

    const mandatoryLeaves = [
      {
        title: "Cuti Bersama Imlek",
        is_active: true,
        description: "Cuti bersama Tahun Baru Imlek 2576 Kongzili",
        start_date: new Date("2025-01-28"),
        end_date: new Date("2025-01-28"),
      },
      {
        title: "Cuti Bersama Nyepi",
        is_active: true,
        description: "Cuti bersama Hari Raya Nyepi Tahun Baru Saka 1947",
        start_date: new Date("2025-03-28"),
        end_date: new Date("2025-03-28"),
      },
      {
        title: "Cuti Bersama Idul Fitri",
        is_active: true,
        description: "Cuti bersama Hari Raya Idul Fitri 1446 H",
        start_date: new Date("2025-04-02"),
        end_date: new Date("2025-04-07"),
      },
      {
        title: "Cuti Bersama Waisak",
        is_active: true,
        description: "Cuti bersama Hari Raya Waisak 2569 BE",
        start_date: new Date("2025-05-13"),
        end_date: new Date("2025-05-13"),
      },
      {
        title: "Cuti Bersama Kenaikan Isa Almasih",
        is_active: true,
        description: "Cuti bersama memperingati Kenaikan Isa Almasih",
        start_date: new Date("2025-05-30"),
        end_date: new Date("2025-05-30"),
      },
      {
        title: "Cuti Bersama Idul Adha",
        is_active: true,
        description: "Cuti bersama Hari Raya Idul Adha 1446 H",
        start_date: new Date("2025-06-09"),
        end_date: new Date("2025-06-09"),
      },
      {
        title: "Cuti Bersama HUT RI",
        is_active: true,
        description: "Cuti bersama Hari Ulang Tahun Kemerdekaan Republik Indonesia ke-80",
        start_date: new Date("2025-08-18"),
        end_date: new Date("2025-08-18"),
      },
    ];



    for (const leave of mandatoryLeaves) {
      await tx.tb_mandatory_leave.create({
        data: leave,
      });
    }
  });
}

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