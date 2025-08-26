import prisma from "../../utils/client.js";

export const leaveLeaderboard = async (order = "desc") => {
    const users = await prisma.tb_users.findMany({
        where : {
            NOT : {
                role: 'magang'
            }
        },
        include: {
            tb_balance: true,
            tb_leave: {
                where: {
                    status: 'approved',
                },
                select: {
                    total_days: true,
                    start_date: true,
                    end_date: true,
                    leave_type: true
                }
            },
            tb_balance_adjustment: true
        }
    });

    const today = new Date();
    const currentYear = today.getFullYear();

    const leaderboard = users.map(user => {
        const joinDate = new Date(user.join_date);

        //bulan pertama bekerja
        let effectiveJoin = new Date(joinDate)
        if(joinDate.getDate() > 20) {
            effectiveJoin.setMonth(effectiveJoin.getMonth() + 1)
        }
        effectiveJoin.setDate(1)

        //bulan mendapatkan hak cuti (setelah 3 bulan kerja)
        let  eligibleDate = new Date(effectiveJoin)
        eligibleDate.setMonth(eligibleDate.getMonth() + 3)
        eligibleDate.setDate(1)

        let joinMonthDiff = (today.getFullYear() - effectiveJoin.getFullYear()) * 12 +
                        (today.getMonth() - effectiveJoin.getMonth());
        if (today.getDate() >= effectiveJoin.getDate()) {
            joinMonthDiff += 1
        }

        //ambil 12 bulan kebelakang
        let fromDate
        if (joinMonthDiff >= 16) {
            fromDate = new Date(today)
            fromDate.setMonth(fromDate.getMonth() - 12)
        } else {
            fromDate = new Date(effectiveJoin)
        }

        //ambil 12 bulan ke depan
        let toDate = new Date(today)
        toDate.setMonth(toDate.getMonth() + 12)

        //total cuti yg sudah diberikan dalam periode 24 bulan terakhir
        const givenLeave = user.tb_balance_adjustment.filter(adj => {
            const created = new Date(adj.created_at);
            return created >= fromDate && created <= toDate;
        })
        .reduce((sum, adj) => sum + (adj.adjustment_value || 0), 0);

        //total cuti terpakai 
        const usedLeave = user.tb_leave.filter(l => {
            const start = new Date(l.start_date);

            if(l.leave_type === 'mandatory_leave') {
                return start >= fromDate && start <= toDate
            } else {
                return start >= fromDate && start <= toDate && start >= eligibleDate
            }
        })
        .reduce((sum, l) => sum + (l.total_days || 0), 0);

        //sisa cuti
        const remainingLeave = givenLeave - usedLeave

        //average leave range (0-1)
        const averageLeave = givenLeave > 0
            ? remainingLeave/givenLeave
            : 0;

        // Jatah cuti tahun ini
        const currentBalance = user.tb_balance.find(
            b => new Date(b.receive_date).getFullYear() === currentYear
        );

        // Jatah cuti tahun lalu
        const lastYearBalance = user.tb_balance.find(
            b => new Date(b.receive_date).getFullYear() === currentYear - 1
        );

        const thisYearAmount = currentBalance ? currentBalance.amount : 0;
        const lastYearAmount = lastYearBalance ? lastYearBalance.amount : 0;

        return {
            NIK: user.NIK,
            name: user.fullname,
            role: user.role,
            this_year: thisYearAmount,
            last_year: lastYearAmount,
            total_amount: lastYearAmount + thisYearAmount,
            given_leave: givenLeave,
            used_leave: usedLeave,
            average_leave: Number(averageLeave.toFixed(2))
        };
    });

    // urutkan berdasarkan sisa cuti
    leaderboard.sort((a, b) => {
        return order === "asc"
            ? a.average_leave - b.average_leave
            : b.average_leave - a.average_leave;
    });

    return leaderboard;
};