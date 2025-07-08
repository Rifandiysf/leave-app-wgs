import prisma from '../utils/client.js';

async function main() {
  await prisma.$transaction(async (tx) => {
    await tx.tb_users.create({
      data: {
        NIK: '102938',
        fullname: 'Michael Roberts',
        email: 'michael.roberts@example.com',
        password: 'SecurePass456',
        gender: 'male',
        role: 'karyawan_tetap',
        join_date: new Date('2024-06-01'),
      },
    });

    await tx.tb_balance.create({
      data: {
        amount: 18,
        receive_date: new Date('2025-01-05'),
        expired_date: new Date('2025-12-31'),
        NIK: '102938',
      },
    });

    const mandatory = await tx.tb_mandatory_leave.create({
      data: {
        title: 'Company Anniversary',
        duration: 1,
        description: 'Mandatory day off to celebrate company anniversary.',
      },
    });

    const special = await tx.tb_special_leave.create({
      data: {
        title: 'Parental Leave',
        applicable_gender: 'mf',
        duration: 10,
        description: 'Special leave for new parents.',
      },
    });

    const personalLeave = await tx.tb_leave.create({
      data: {
        title: 'Doctor Appointment',
        leave_type: 'personal_leave',
        start_date: new Date('2025-03-10'),
        end_date: new Date('2025-03-11'),
        total_days: 2,
        reason: 'Medical check-up',
        status: 'pending',
        created_at: new Date(),
        NIK: '102938',
      },
    });

    await tx.tb_leave.create({
      data: {
        title: 'Company Celebration',
        leave_type: 'mandatory_leave',
        start_date: new Date('2025-07-10'),
        end_date: new Date('2025-07-10'),
        total_days: 1,
        reason: 'Company-wide event',
        status: 'approved',
        created_at: new Date(),
        NIK: '102938',
        id_mandatory: mandatory.id_mandatory,
      },
    });

    await tx.tb_leave.create({
      data: {
        title: 'Parental Support Leave',
        leave_type: 'special_leave',
        start_date: new Date('2025-08-05'),
        end_date: new Date('2025-08-14'),
        total_days: 10,
        reason: 'Support for newborn baby',
        status: 'approved',
        created_at: new Date(),
        NIK: '102938',
        id_special: special.id_special,
      },
    });

    await tx.tb_balance_adjustment.create({
      data: {
        adjustment_value: 2,
        notes: 'Bonus leave for employee of the month',
        created_at: new Date(),
        actor: 'example admin',
        NIK: '102938',
      },
    });

    await tx.tb_leave_log.create({
      data: {
        old_status: 'pending',
        new_status: 'approved',
        reason: 'Approved by supervisor',
        changed_at: new Date(),
        changed_by_nik: '102938',
        id_leave: personalLeave.id_leave,
      },
    });
  });
}

main()
  .then(() => {
    console.log('Seeding completed successfully');
    return prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Seeding failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
