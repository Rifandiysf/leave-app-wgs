import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.tb_users.create({
        data: {
            NIK: '1234567890123456',
            fullname: 'Example user',
            email: 'example_user@gmail.com',
            password: 'example_password',
            gender: 'male',
            role: 'karyawan_tetap',
            join_date: new Date('2023-01-01'),
        },
    })

    await prisma.tb_balance.create({
        data: {
            id_balance: 'BAL-001',
            amount: 12,
            receive_date: new Date('2024-01-01'),
            expired_date: new Date('2024-12-31'),
            NIK: '1234567890123456',
        },
    })

    await prisma.tb_mandatory_leave.create({
        data: {
            id_mandatory: 'MAND-001',
            title: 'Example mandatory leave',
            duration: 3,
            description: 'Example mandatory leave for all employees.',
        },
    })

    await prisma.tb_special_leave.create({
        data: {
            id_special: 'SPEC-001',
            title: 'Example special leave',
            applicable_gender: 'mf',
            duration: 90,
            description: 'Example special leave for all employees.',
        },
    })

    await prisma.tb_leave.create({
        data: {
            id_leave: 'LEA-001',
            title: 'Example Leave',
            leave_type: 'personal_leave',
            start_date: new Date('2024-07-01'),
            end_date: new Date('2024-07-05'),
            total_days: 5,
            reason: 'Family vacation',
            status: 'pending',
            created_at: new Date(),
            NIK: '1234567890123456',
        },
    })

    await prisma.tb_leave.create({
        data: {
            id_leave: 'LEA-002',
            title: 'National Leave Day',
            leave_type: 'mandatory_leave',
            start_date: new Date('2024-08-17'),
            end_date: new Date('2024-08-17'),
            total_days: 1,
            reason: 'Independence Day',
            status: 'approved',
            created_at: new Date(),
            NIK: '1234567890123456',
            id_mandatory: 'MAND-001',
        },
    })

    await prisma.tb_leave.create({
        data: {
            id_leave: 'LEA-003',
            title: 'Maternity Leave',
            leave_type: 'special_leave',
            start_date: new Date('2024-06-01'),
            end_date: new Date('2024-08-30'),
            total_days: 90,
            reason: 'Maternity time off',
            status: 'approved',
            created_at: new Date(),
            NIK: '1234567890123456',
            id_special: 'SPEC-001',
        },
    })
}

main()
    .then(() => {
        console.log('Seeding completed')
        return prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error('Seeding failed', error)
        await prisma.$disconnect()
    })
