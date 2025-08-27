import prisma from '../utils/client.js';
import bcrypt from 'bcrypt';

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

    // Delete existing roles and statuses to prevent conflicts on re-seed
    await tx.tb_roles.deleteMany();
    await tx.tb_statuses.deleteMany();
    await tx.tb_settings.deleteMany(); // Add this line to clear settings

    // Seed Settings
    await tx.tb_settings.create({
      data: {
        light_image: "http://localhost:3001/uploads/putih.png",
        light_background: "#FFFFFF",
        light_foreground: "#000000",
        light_card: "#F5F5F5",
        light_cardForeground: "#000000",
        light_primary: "#007BFF",
        light_primaryForeground: "#FFFFFF",
        light_secondary: "#6C757D",
        light_secondaryForeground: "#FFFFFF",
        dark_image: "http://localhost:3001/uploads/hitam.png",
        dark_background: "#121212",
        dark_foreground: "#FFFFFF",
        dark_card: "#1E1E1E",
        dark_cardForeground: "#FFFFFF",
        dark_primary: "#6A0DAD",
        dark_primaryForeground: "#FFFFFF",
        dark_secondary: "#BB86FC",
        dark_secondaryForeground: "#000000",
      },
    });

    // Seed Roles
    const rolesData = [
      { name: 'Super Admin', slug: 'super_admin', description: 'Full administrative access' },
      { name: 'Admin', slug: 'admin', description: 'Administrative access with some limitations' },
      { name: 'User', slug: 'user', description: 'user' },
    ];

    const createdRoles = {};
    for (const role of rolesData) {
      const newRole = await tx.tb_roles.create({ data: role });
      createdRoles[role.slug] = newRole.id;
    }

    // Seed Statuses
    const statusesData = [
      { name: 'Magang' },
      { name: 'Kontrak' },
      { name: 'Tetap' },
    ];

    const createdStatuses = {};
    for (const status of statusesData) {
      const newStatus = await tx.tb_statuses.create({ data: status });
      createdStatuses[status.name] = newStatus.id;
    }

    const users = [
      {
        NIK: '100001',
        fullname: 'Rani Kontrak',
        email: 'rani.kontrak@perusahaan.com',
        password: 'Rani1234!',
        gender: 'female',
        roleSlug: 'user',
        statusName: 'Kontrak',
        join_date: new Date('2024-01-15'),
      },
      {
        NIK: '100002',
        fullname: 'Budi Tetap',
        email: 'budi.tetap@perusahaan.com',
        password: 'Budi1234!',
        gender: 'male',
        roleSlug: 'user',
        statusName: 'Tetap',
        join_date: new Date('2023-11-01'),
      },
      {
        NIK: '100003',
        fullname: 'Tina Magang',
        email: 'tina.magang@perusahaan.com',
        password: 'Tina1234!',
        gender: 'female',
        roleSlug: 'user',
        statusName: 'Magang',
        join_date: new Date('2025-06-01'),
      },
      {
        NIK: '100004',
        fullname: 'Andi Admin',
        email: 'andi.admin@perusahaan.com',
        password: 'Admin123!',
        gender: 'male',
        roleSlug: 'admin',
        statusName: 'Tetap',
        join_date: new Date('2024-09-15'),
      },
      {
        NIK: '100005',
        fullname: 'Sari Super',
        email: 'sari.super@perusahaan.com',
        password: 'Super123!',
        gender: 'female',
        roleSlug: 'super_admin',
        statusName: 'Tetap',
        join_date: new Date('2023-01-10'),
      },
      {
        NIK: '100006',
        fullname: 'Tati Kontrak',
        email: 'tati.kontrak@perusahaan.com',
        password: 'Tati123!',
        gender: 'female',
        roleSlug: 'user',
        statusName: 'Magang',
        join_date: new Date('2015-10-24'),
      },
      {
        NIK: '100007',
        fullname: 'Bondan Admin',
        email: 'bondan.admin@perusahaan.com',
        password: 'Bondan123!',
        gender: 'male',
        is_active: false,
        roleSlug: 'admin',
        statusName: 'Tetap',
        join_date: new Date('2017-03-15'),
      },
      {
        NIK: '100008',
        fullname: 'Santi Kontrak',
        email: 'santi.kontrak@perusahaan.com',
        password: 'Santi123!',
        gender: 'female',
        is_active: false,
        roleSlug: 'user',
        statusName: 'Kontrak',
        join_date: new Date('2018-07-09'),
      },
      {
        NIK: '100009',
        fullname: 'Andi Magang',
        email: 'andi.magang@perusahaan.com',
        password: 'Andi123!',
        gender: 'male',
        is_active: false,
        roleSlug: 'user',
        statusName: 'Magang',
        join_date: new Date('2020-01-20'),
      },
      {
        NIK: '100010',
        fullname: 'Rina Tetap',
        email: 'rina.tetap@perusahaan.com',
        password: 'Rina123!',
        gender: 'female',
        is_active: false,
        roleSlug: 'user',
        statusName: 'Tetap',
        join_date: new Date('2016-05-12'),
      },
    ];


    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
      await tx.tb_users.create({
        data: {
          NIK: user.NIK,
          fullname: user.fullname,
          email: user.email,
          password: hashedPassword, // Use the hashed password
          gender: user.gender,
          role_id: createdRoles[user.roleSlug],
          status_id: createdStatuses[user.statusName],
          join_date: user.join_date,
          is_active: user.is_active
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