import prisma from "../utils/client.js";


export const getAllLeaves = async () => {
    return await prisma.tb_leave.findMany()
}


// update leave

// update record balance yang terkait dengan NIK di record leave
//  - pending => approved : -
//  - pending => reject : none
//  - approved => reject : +

// post record leave di tb_leave_log


export const updateLeave = async (id, status, notes, nik) => {
    try {
        const data = await prisma.tb_leave.findUnique({
            where: {
                id_leave: id,
            },
            include: {
                tb_users: true
            }
        });

        const userBalance = await prisma.tb_balance.findMany({
            where: {
                NIK: data.NIK,
                expired_date: {
                    gte: new Date()
                }
            },
            orderBy: {
                expired_date: "desc"
            }
        });

        if (data.status === status) {
            throw new Error("New status and old status can't be the same");   
        }

        let currentBalance = userBalance[0] ? userBalance[0].amount : 0;
        let carriedBalance = userBalance[1] ? userBalance[1].amount : 0;
        let tempBalance = 0;
        let maxAmountReceive = 12;

        if (data.tb_users.role === "karyawan_kontrak") {
            maxAmountReceive = 1;
        }

        // kondisi berdasarkan status leave saat ini dan status mendatang
        if (data.leave_type !== "special_leave") {
            if (data.status === "approved" && status === "rejected") {
                currentBalance += data.total_days;
            } else if (data.status === "rejected" && status === "approved") {
                carriedBalance -= data.total_days;
            } else if (data.status === "pending" && status === "approved") {
                carriedBalance -= data.total_days;
            } else if (data.status === "pending" && status === "rejected"){
                currentBalance += data.total_days;
            }
        }

        // jika carried balance seteleah dikurangi hasilnya minus
        if (carriedBalance < 0) {
            tempBalance = -1 * (carriedBalance)
            currentBalance -= tempBalance;
            carriedBalance = 0;
        }

        // jika current balance setelah ditambah ternyata hasilnya lebih dari 12
        if (currentBalance > maxAmountReceive) {
            tempBalance = currentBalance - maxAmountReceive
            carriedBalance += tempBalance;
            currentBalance = maxAmountReceive;
        }

        const resultLeave = await prisma.tb_leave.update({
            where: {
                id_leave : id
            },
            data: {
                status : status
            }
        })

        // update 2 record balance menggunakan variable carriedBalance dan currentBalance
        // update tabel leave
        // update tabel tb_leave_logs
        const result = await prisma.$transaction([
            prisma.tb_leave.update({ where: { id_leave: id}, data: { status: status}}),
            prisma.tb_balance.update({ where: { id_balance: userBalance[0].id_balance }, data: { amount: currentBalance} }),
            prisma.tb_balance.update({ where: {id_balance: userBalance[1].id_balance}, data: { amount: carriedBalance }}),
            prisma.tb_leave_log.create({ data: {
                old_status: data.status,
                new_status: status,
                reason: notes,
                changed_by_nik: nik,
                id_leave: data.id_leave,
                changed_at: new Date()
            }})
        ])

        console.log(result[0])
        console.log(result[1], result[2])
        console.log(`currentBalance: ${result[1].amount}\ncarriedBalance: ${result[2].amount}\ncurrentStatus: ${status} \npreviousStatus: ${data.status}`)
    } catch (error) {
        console.error(error.message);
    }
    
   
}


updateLeave('c711b5c6-6a4c-4010-a909-4e59264373c1', 'approved', "disetujui oleh admin", "100005");



