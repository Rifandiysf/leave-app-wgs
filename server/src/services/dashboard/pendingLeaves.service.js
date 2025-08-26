import prisma from "../../utils/client.js";

export const pendingLeaves = async () => {
    const leaves = await prisma.tb_leave.findMany({
        where : {
            status: 'pending'
        },
        include : {
            tb_users: {
                select : {
                    fullname: true,
                    NIK : true,
                    role: true
                }
            }
        },
        orderBy : {
            start_date : 'asc'
        }
    })

    const formatted = leaves.map(leave => {
        return {
            NIK: leave.tb_users.NIK,
            name: leave.tb_users.fullname,
            type: leave.leave_type.replace(/_/g, " "),
            start_date: leave.start_date, // kirim raw Date (ISO)
            end_date: leave.end_date,     // kirim raw Date (ISO)
            duration: `${leave.total_days} days`,
            status: leave.status
        }
    })

    const totalPending = new Set(formatted.map(f => f.NIK))
    return {
        total_employee: totalPending.size,
        data: formatted
    }
}