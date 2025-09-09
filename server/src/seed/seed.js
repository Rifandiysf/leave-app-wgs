import prisma from "../utils/client.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { createDateFromString } from "../utils/leaves.utils.js";

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
    await tx.tb_settings.deleteMany();

    await tx.tb_settings.create({
      data: {
        light_image: `http://localhost:3001/uploads/dark.svg`,
        light_background: "#FFFFFF",
        light_foreground: "#191B21",
        light_card: "#dbeafe",
        light_cardForeground: "#193cb8",
        light_primary: "#dbeafe",
        light_primaryForeground: "#191B21",
        light_secondary: "#155dfc",
        light_secondaryForeground: "#FFFFFF",
        dark_image: `http://localhost:3001/uploads/light.svg`,
        dark_background: "#191B21",
        dark_foreground: "#FFFFFF",
        dark_card: "#212838",
        dark_cardForeground: "#FFFFFF",
        dark_primary: "#212838",
        dark_primaryForeground: "#dbeafe",
        dark_secondary: "#155dfc",
        dark_secondaryForeground: "#191B21",
      },
    });

    // Delete existing roles and statuses to prevent conflicts on re-seed
    await tx.tb_roles.deleteMany();
    await tx.tb_statuses.deleteMany();
    await tx.tb_settings.deleteMany(); // Add this line to clear settings

    // Seed Settings
    await tx.tb_settings.create({
      data: {
        light_image: `http://localhost:3001/uploads/dark.svg`,
        light_background: "#FFFFFF",
        light_foreground: "#191B21",
        light_card: "#dbeafe",
        light_cardForeground: "#193cb8",
        light_primary: "#dbeafe",
        light_primaryForeground: "#191B21",
        light_secondary: "#155dfc",
        light_secondaryForeground: "#FFFFFF",
        dark_image: `http://localhost:3001/uploads/light.svg`,
        dark_background: "#191B21",
        dark_foreground: "#FFFFFF",
        dark_card: "#212838",
        dark_cardForeground: "#FFFFFF",
        dark_primary: "#212838",
        dark_primaryForeground: "#dbeafe",
        dark_secondary: "#155dfc",
        dark_secondaryForeground: "#191B21",
      },
    });

    // Seed Roles
    const rolesData = [
      {
        name: "Super Admin",
        slug: "super_admin",
        description: "Full administrative access",
      },
      {
        name: "Admin",
        slug: "admin",
        description: "Administrative access with some limitations",
      },
      { name: "User", slug: "user", description: "user" },
    ];

    const createdRoles = {};
    for (const role of rolesData) {
      const newRole = await tx.tb_roles.create({ data: role });
      createdRoles[role.slug] = newRole.id;
    }

    // Seed Statuses
    const statusesData = [
      { name: "Magang" },
      { name: "Kontrak" },
      { name: "Tetap" },
    ];

    const createdStatuses = {};
    for (const status of statusesData) {
      const newStatus = await tx.tb_statuses.create({ data: status });
      createdStatuses[status.name] = newStatus.id;
    }

    const users = [
      {
        NIK: "100001",
        fullname: "Rani Kontrak",
        email: "rani.kontrak@perusahaan.com",
        password: "Rani1234!",
        isMale: false,
        isActive: true,
        roleSlug: "user",
        statusName: "Kontrak",
        join_date: new Date("2022-01-15"),
      },
      {
        NIK: "100002",
        fullname: "Budi Tetap",
        email: "budi.tetap@perusahaan.com",
        password: "Budi1234!",
        isMale: true,
        isActive: true,
        roleSlug: "user",
        statusName: "Tetap",
        join_date: new Date("2022-11-01"),
      },
      {
        NIK: "100003",
        fullname: "Tina Magang",
        email: "tina.magang@perusahaan.com",
        password: "Tina1234!",
        isMale: false,
        isActive: true,
        roleSlug: "user",
        statusName: "Magang",
        join_date: new Date("2022-06-01"),
      },
      {
        NIK: "100004",
        fullname: "Andi Admin",
        email: "andi.admin@perusahaan.com",
        password: "Admin123!",
        isMale: true,
        isActive: true,
        roleSlug: "admin",
        statusName: "Tetap",
        join_date: new Date("2022-09-15"),
      },
      {
        NIK: "100005",
        fullname: "Sari Super",
        email: "sari.super@perusahaan.com",
        password: "Super123!",
        isMale: false,
        isActive: true,
        roleSlug: "super_admin",
        statusName: "Tetap",
        join_date: new Date("2022-01-10"),
      },
      {
        NIK: "100006",
        fullname: "Tati Kontrak",
        email: "tati.kontrak@perusahaan.com",
        password: "Tati123!",
        isMale: false,
        isActive: true,
        roleSlug: "user",
        statusName: "Magang",
        join_date: new Date("2022-10-24"),
      },
      {
        NIK: "100007",
        fullname: "Bondan Admin",
        email: "bondan.admin@perusahaan.com",
        password: "Bondan123!",
        isMale: true,
        isActive: false,
        roleSlug: "admin",
        statusName: "Tetap",
        join_date: new Date("2022-03-15"),
      },
      {
        NIK: "100008",
        fullname: "Santi Kontrak",
        email: "santi.kontrak@perusahaan.com",
        password: "Santi123!",
        isMale: false,
        isActive: false,
        roleSlug: "user",
        statusName: "Kontrak",
        join_date: new Date("2022-07-09"),
      },
      {
        NIK: "100009",
        fullname: "Andi Magang",
        email: "andi.magang@perusahaan.com",
        password: "Andi123!",
        isMale: true,
        isActive: false,
        roleSlug: "user",
        statusName: "Magang",
        join_date: new Date("2022-01-20"),
      },
      {
        NIK: "100010",
        fullname: "Rina Tetap",
        email: "rina.tetap@perusahaan.com",
        password: "Rina123!",
        isMale: false,
        isActive: false,
        roleSlug: "user",
        statusName: "Tetap",
        join_date: new Date("2022-05-12"),
      },
    ];

    for (const user of users) {
      await tx.tb_users.create({
        data: {
          NIK: user.NIK,
          fullname: user.fullname,
          email: user.email,
          password: user.password,
          isMale: user.isMale,
          role_id: createdRoles[user.roleSlug],
          status_id: createdStatuses[user.statusName],
          join_date: user.join_date,
          isActive: user.isActive,
        },
      });

      if (user.isActive && user.statusName !== "Magang") {
         const balanceLastTwoYear = await tx.tb_balance.create({
          data: {
            amount: 12,
            receive_date: new Date("2023-01-01"),
            expired_date: createDateFromString(new Date(2025, 3, 1)),
            NIK: user.NIK,
          },
        });

        await tx.tb_balance_adjustment.create({
          data: {
            actor: "system",
            balance_year: balanceLastTwoYear.receive_date.getFullYear(),
            NIK: balanceLastTwoYear.NIK,
            notes: "Created balance",
            id_balance: balanceLastTwoYear.id_balance,
            adjustment_value: balanceLastTwoYear.amount,
          },
        });

        const balanceLastYear = await tx.tb_balance.create({
          data: {
            amount: 12,
            receive_date: new Date("2024-01-01"),
            expired_date: createDateFromString(new Date(2026, 3, 1)),
            NIK: user.NIK,
          },
        });

        await tx.tb_balance_adjustment.create({
          data: {
            actor: "system",
            balance_year: balanceLastYear.receive_date.getFullYear(),
            NIK: balanceLastYear.NIK,
            notes: "Created balance",
            id_balance: balanceLastYear.id_balance,
            adjustment_value: balanceLastYear.amount,
          },
        });

        const balanceThisYear = await tx.tb_balance.create({
          data: {
            amount: 12,
            receive_date: new Date("2025-01-01"),
            expired_date: createDateFromString(new Date(2027, 3, 1)),
            NIK: user.NIK,
          },
        });

        await tx.tb_balance_adjustment.create({
          data: {
            actor: "system",
            balance_year: balanceThisYear.receive_date.getFullYear(),
            NIK: balanceThisYear.NIK,
            notes: "Created balance",
            id_balance: balanceThisYear.id_balance,
            adjustment_value: balanceThisYear.amount,
          },
        });
      }
    }

        const specialLeaves = [
      {
        title: "Cuti Melahirkan",
        applicable_gender: "f",
        duration: 3,
        type: "month",
        is_active: true,
        description: "Cuti melahirkan untuk karyawan perempuan",
      },
      {
        title: "Cuti Haid",
        applicable_gender: "f",
        duration: 2,
        type: "day",
        is_active: true,
        description: "Cuti haid untuk karyawan perempuan",
      },
      {
        title: "Cuti Menikah",
        applicable_gender: "mf",
        duration: 3,
        type: "day",
        is_active: true,
        description: "Cuti menikah untuk karyawan",
      },
      {
        title: "Cuti Menikahkan Anak",
        applicable_gender: "mf",
        duration: 2,
        type: "day",
        is_active: true,
        description: "Cuti menikahkan anak untuk karyawan",
      },
      {
        title: "Cuti Mengkhitankan Anak",
        applicable_gender: "mf",
        duration: 2,
        type: "day",
        is_active: true,
        description: "Cuti mengkhitankan anak untuk karyawan",
      },
      {
        title: "Cuti Membaptis Anak",
        applicable_gender: "mf",
        duration: 2,
        type: "day",
        is_active: true,
        description: "Cuti membaptis anak untuk karyawan",
      },
      {
        title: "Cuti Istri Melahirkan/Keguguran",
        applicable_gender: "m",
        duration: 2,
        type: "day",
        is_active: true,
        description: "Cuti karena istri melahirkan atau keguguran",
      },
      {
        title: "Cuti Keluarga Inti Meninggal",
        applicable_gender: "mf",
        duration: 2,
        type: "day",
        is_active: true,
        description:
          "Cuti karena meninggal suami/istri/orang tua/mertua/anak/menantu",
      },
      {
        title: "Cuti Anggota Serumah Meninggalll",
        applicable_gender: "mf",
        duration: 1,
        type: "day",
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
    console.log("✅ Seed selesai.");
    return prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("❌ Seed gagal:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
