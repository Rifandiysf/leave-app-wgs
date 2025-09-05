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

    // Delete existing roles and statuses to prevent conflicts on re-seed
    await tx.tb_roles.deleteMany();
    await tx.tb_statuses.deleteMany();
    await tx.tb_settings.deleteMany(); // Add this line to clear settings

    // Seed Settings
    await tx.tb_settings.create({
      data: {
        light_image: "/uploads/default_light.png",
        light_background: "#FFFFFF",
        light_foreground: "#000000",
        light_card: "#F5F5F5",
        light_cardForeground: "#000000",
        light_primary: "#007BFF",
        light_primaryForeground: "#FFFFFF",
        light_secondary: "#6C757D",
        light_secondaryForeground: "#FFFFFF",
        dark_image: "/uploads/default_dark.png",
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
      { name: 'Karyawan Tetap', slug: 'karyawan_tetap', description: 'Permanent employee' },
      { name: 'Karyawan Kontrak', slug: 'karyawan_kontrak', description: 'Contract employee' },
      { name: 'Magang', slug: 'magang', description: 'Intern' },
    ];

    const createdRoles = {};
    for (const role of rolesData) {
      const newRole = await tx.tb_roles.create({ data: role });
      createdRoles[role.slug] = newRole.id;
    }

    // Seed Statuses
    const statusesData = [
      { name: 'Active' },
      { name: 'Resign' },
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
        NIK: '1',
        fullname: 'System',
        email: 'system@perusahaan.com',
        password: 'System123!',
        isMale: true,
        roleSlug: 'super_admin',
        statusName: 'Active',
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
          role_id: createdRoles[user.roleSlug],
          status_id: createdStatuses[user.statusName],
          join_date: user.join_date,
          isActive: user.isActive
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
}););
