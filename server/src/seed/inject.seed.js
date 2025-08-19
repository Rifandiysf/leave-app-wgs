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
        fullname: 'System',
        email: 'system@perusahaan.com',
        password: 'System123!',
        gender: 'male',
        role: 'super_admin',
        status: 'active',
        join_date: new Date('2024-01-15'),
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
        title: "Tahun Baru Masehi",
        is_active: true,
        description: "Libur nasional memperingati Tahun Baru",
        start_date: new Date("2025-01-01"),
        end_date: new Date("2025-01-01"),
      },
      {
        title: "Isra Miraj",
        is_active: true,
        description: "Peringatan Isra Miraj Nabi Muhammad SAW",
        start_date: new Date("2025-01-27"),
        end_date: new Date("2025-01-27"),
      },
      {
        title: "Tahun Baru Imlek",
        is_active: true,
        description: "Tahun Baru China / Imlek",
        start_date: new Date("2025-02-01"),
        end_date: new Date("2025-02-01"),
      },
      {
        title: "Hari Raya Nyepi",
        is_active: true,
        description: "Tahun Baru Saka umat Hindu",
        start_date: new Date("2025-03-29"),
        end_date: new Date("2025-03-29"),
      },
      {
        title: "Wafat Isa Almasih",
        is_active: true,
        description: "Peringatan wafatnya Isa Almasih",
        start_date: new Date("2025-04-18"),
        end_date: new Date("2025-04-18"),
      },
      {
        title: "Hari Raya Idul Fitri",
        is_active: true,
        description: "Lebaran Hari Raya Umat Islam",
        start_date: new Date("2025-03-31"),
        end_date: new Date("2025-04-01"),
      },
      {
        title: "Hari Buruh Internasional",
        is_active: true,
        description: "Hari Buruh Nasional",
        start_date: new Date("2025-05-01"),
        end_date: new Date("2025-05-01"),
      },
      {
        title: "Kenaikan Isa Almasih",
        is_active: true,
        description: "Peringatan kenaikan Isa Almasih",
        start_date: new Date("2025-05-29"),
        end_date: new Date("2025-05-29"),
      },
      {
        title: "Hari Raya Idul Adha",
        is_active: true,
        description: "Hari Raya Qurban Umat Islam",
        start_date: new Date("2025-06-06"),
        end_date: new Date("2025-06-06"),
      },
      {
        title: "Tahun Baru Islam",
        is_active: true,
        description: "Tahun Baru Hijriyah",
        start_date: new Date("2025-06-26"),
        end_date: new Date("2025-06-26"),
      },
      {
        title: "Hari Kemerdekaan RI",
        is_active: true,
        description: "Memperingati Proklamasi Kemerdekaan Indonesia",
        start_date: new Date("2025-08-17"),
        end_date: new Date("2025-08-17"),
      },
      {
        title: "Maulid Nabi Muhammad SAW",
        is_active: true,
        description: "Hari kelahiran Nabi Muhammad SAW",
        start_date: new Date("2025-09-05"),
        end_date: new Date("2025-09-05"),
      },
      {
        title: "Hari Natal",
        is_active: true,
        description: "Hari kelahiran Yesus Kristus",
        start_date: new Date("2025-12-25"),
        end_date: new Date("2025-12-25"),
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