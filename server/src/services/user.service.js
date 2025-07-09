import { gte, includes, object } from "zod/v4"
import prisma from "../utils/client.js"
import { leave_type, role, status } from "../../generated/prisma/index.js"
import { date } from "zod"

export const getLeaveBalanceByYear = async (nik, year) => {
    const startDate = new Date(`${year}-01-01`)
    const endDate = new Date(`${year}-12-31`)

    return await prisma.tb_balance.findFirst({
        where: {
            NIK: nik,
            receive_date: {
                gte: startDate,
                lte: endDate,
            },
        },
        select: {
            amount: true,
        },
    })
}

export const getLeavesByNIK = async (NIK) => {
    return await prisma.tb_leave.findMany({
        where: {
            NIK: NIK,
        },
    })
}

export const findUserByNIK = async (nik) => {
    const user = await prisma.tb_users.findUnique({
        omit: {
            password: true,
            email: true,
        },
        where: {
            NIK: nik
        },
        include: {
            tb_balance: {
                where: {
                    expired_date: {
                        gte: new Date()
                    }
                },
                orderBy: {
                    expired_date: "asc"
                }
            },
        }
    });
    
    const { tb_balance, NIK, fullname, gender, status_active } = user;
    
    const currentBalance = tb_balance[0].amount;
    const lastYearBalance =  tb_balance[1] ? tb_balance[1].amount : 0;
    let maxAmountReceive;
    
    if (user.role === "karyawan_kontrak") {
        maxAmountReceive = 1;
    } else {
        maxAmountReceive = 12;
    }
 
    const pending_request = await prisma.tb_leave.aggregate({
        _sum: {
            total_days: true
        },
        where: {
            created_at: {
                gte: new Date(new Date().getFullYear(), 0, 1),
                lte: new Date()
            },
            NIK: nik,
            status: "pending",
            leave_type: {
                in: ["personal_leave", "mandatory_leave"]
            }
        },
    });

    const approved_request = await prisma.tb_leave.aggregate({
        _sum: {
            total_days: true
        },
        where: {
            end_date: {
                gte: new Date(new Date().getFullYear(), 0, 1),
                lte: new Date(),
            },
            NIK: nik,
            status: "approved",
            leave_type: {
                in: ["personal_leave", "mandatory_leave"]
            }
        },
    });

    const userCopy = {
        NIK: NIK,
        fullname: fullname,
        gender: gender,
        status_active: status_active,
        role: user.role,
        balance : {
            total_amount: currentBalance + lastYearBalance || 0,
            current_amount: currentBalance || 0,
            carried_amount: lastYearBalance|| 0,
            days_used:  approved_request._sum.total_days  || 0,
            pending_request: pending_request._sum.total_days || 0,
        }
    }

    return userCopy;
}

const updateUser = async (nik, data) => {
    const updateUser = await prisma.tb_users.update({
        where: {
            NIK: nik
        },
        data: {
            status_active: "active",
            join_date: new Date()
        }
    })
}

const deleteUser = async (nik) => {
    const deletedUser = await prisma.tb_users.update({
        where: {
            NIK: nik
        },
        data: {
            status_active: "resign"
        }
    })

    const userLeaves = await prisma.tb_leave.updateMany({
        where: {
            NIK: nik
        },
        data: {
            // update user leaves to incative
        }
    })

}