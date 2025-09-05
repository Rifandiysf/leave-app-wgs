import prisma from "../../utils/client.js";

export const updateLeaveBalance = async (user) => {
    function formatDateLocal(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }
    const today = new Date();
    const joinDate = new Date(user.join_date);

    if (user.isActive === false) {
        console.log(`[SKIP] NIK: ${user.NIK} status: RESIGN`);
        return;
    }

    const currentYear = today.getFullYear();

    if (user.tb_statuses.name === "Tetap") {
        const todayStr = formatDateLocal(today)
        const joinEffective = new Date(joinDate)
        if(joinDate.getDate() > 20) {
            joinEffective.setMonth(joinEffective.getMonth() + 1)
        }
        joinEffective.setDate(1)

        const eligibleDate = new Date(joinEffective)
        eligibleDate.setMonth(eligibleDate.getMonth() + 3)
        eligibleDate.setDate(1)

        const eligibleStr = formatDateLocal(eligibleDate)

       // console.log(`[DEBUG] NIK: ${user.NIK}, join: ${joinDate.toISOString().split("T")[0]}, joinEffective: ${joinEffective.toISOString().split("T")[0]}, eligible: ${eligibleStr}`);

        if(todayStr < eligibleStr) {
            console.log(`[SKIP] NIK: ${user.NIK} - not yet received leave rights (hari ini: ${todayStr})`);
            return;
        }

        const adjustmentThisYear = await prisma.tb_balance_adjustment.findFirst({
            where: {
                NIK: user.NIK,
                actor: 'system',
                balance_year: currentYear,
                NOT: {
                    notes: {
                        equals: "auto generate balance",
                        mode: "insensitive"
                    }
                }
            }
        })

        if (!adjustmentThisYear) {
            let leaveAmount = 12 

            const receiveDate = new Date();
            receiveDate.setHours(12, 0, 0, 0);

            const expiredDate = new Date(receiveDate);
            expiredDate.setFullYear(receiveDate.getFullYear() + 2, 0, 1);

            const existingBalance = await prisma.tb_balance.findFirst({
                where: {
                    NIK : user.NIK,
                    receive_date: {
                        gte: new Date(currentYear, 0, 1, 0, 0, 0, 0),
                        lte: new Date(currentYear, 11, 31, 23, 59, 59, 999)
                    }
                }
            })

            console.log(existingBalance, "existinggg")

            if(existingBalance) {
                // update amount
                const resultBalance = await prisma.$transaction(async (tx) => {
                    const newBalance = await tx.tb_balance.update({
                        where: { id_balance: existingBalance.id_balance },
                        data: {
                            amount: existingBalance.amount + leaveAmount
                        }
                    });
                    
                    const adjustmentLog = await tx.tb_balance_adjustment.create({
                        data: {
                            NIK: user.NIK,
                            adjustment_value: leaveAmount,
                            notes: `get ${leaveAmount} days of leave`,
                            created_at: new Date(),
                            actor: 'system',
                            balance_year: currentYear,
                            id_balance: newBalance.id_balance
                        }
                    })

                    return { newBalance, adjustmentLog }
                })

                console.log(`[Balance Updated] NIK: ${user.NIK}, added: ${leaveAmount}, total: ${existingBalance.amount + leaveAmount}`);
            } else {
                const resultBalance = await prisma.$transaction(async (tx) => {
                    const newBalance = await tx.tb_balance.create({
                        data: {
                            NIK: user.NIK,
                            amount: leaveAmount,
                            receive_date: receiveDate,
                            expired_date: expiredDate
                        }
                    });

                    const adjustmentLog = await tx.tb_balance_adjustment.create({
                        data: {
                            NIK: user.NIK,
                            adjustment_value: leaveAmount,
                            notes: `get ${leaveAmount} days of leave`,
                            created_at: new Date(),
                            actor: 'system',
                            balance_year: currentYear,
                            id_balance: newBalance.id_balance
                        }
                    })

                    return { newBalance, adjustmentLog }
                })
        
                console.log(`[Balance Created] NIK: ${user.NIK}, amount: ${leaveAmount}`);
            }
        } else {
            console.log(`[SKIP] NIK: ${user.NIK} - Balance for ${currentYear} already exists`);
        }

    } else if (user.tb_statuses.name === "Kontrak") {
        //console.log(`[DEBUG] Processing kontrak employee NIK: ${user.NIK}, today: ${today.toISOString()}`);

        // Hitung effective join date
        const joinEffective = new Date(joinDate);
        if (joinDate.getDate() > 20) {
            joinEffective.setMonth(joinEffective.getMonth() + 1);
        }
        joinEffective.setDate(1);
        //console.log(`[DEBUG] NIK: ${user.NIK}, joinEffective: ${joinEffective.toISOString()}`);

        const firstEligibleMonth = new Date(joinEffective);
        firstEligibleMonth.setMonth(firstEligibleMonth.getMonth() + 3);

        const startOfCurrentYear = new Date(`${currentYear}-01-01`);
        const effectiveStart = firstEligibleMonth > startOfCurrentYear ? firstEligibleMonth : startOfCurrentYear;

        //console.log(`[DEBUG] NIK: ${user.NIK} - firstEligibleMonth: ${firstEligibleMonth.toISOString()}, effectiveStart: ${effectiveStart.toISOString()}`);

        // Hitung eligible months sampai bulan ini
        let eligibleMonths = 0;

        // Normalize dates untuk perbandingan yang akurat
        const todayNormalized = new Date(today.getFullYear(), today.getMonth(), 1);
        const effectiveStartNormalized = new Date(effectiveStart.getFullYear(), effectiveStart.getMonth(), 1);

        //console.log(`[DEBUG] NIK: ${user.NIK} - todayNormalized: ${todayNormalized.toISOString()}, effectiveStartNormalized: ${effectiveStartNormalized.toISOString()}`);

        if (effectiveStartNormalized <= todayNormalized) {
            eligibleMonths = (todayNormalized.getFullYear() - effectiveStartNormalized.getFullYear()) * 12 +
                (todayNormalized.getMonth() - effectiveStartNormalized.getMonth()) + 1;
        }

        //console.log(`[DEBUG] NIK: ${user.NIK} - eligibleMonths for current year: ${eligibleMonths}`);

        if (eligibleMonths >= 1) {
            // Hitung yang sudah diberikan untuk tahun ini (EXCLUDE backfill)
            const adjustmentsThisYear = await prisma.tb_balance_adjustment.aggregate({
                where: {
                    NIK: user.NIK,
                    actor: 'system',
                    balance_year: currentYear,
                    notes: {
                        not: { contains: 'backfill' }
                    }
                },
                _sum: {
                    adjustment_value: true
                }
            });

            const alreadyGivenThisYear = adjustmentsThisYear._sum.adjustment_value || 0;
            const toAdd = eligibleMonths - alreadyGivenThisYear;

            //console.log(`[DEBUG] NIK: ${user.NIK} - alreadyGivenThisYear: ${alreadyGivenThisYear}, toAdd: ${toAdd}`);

            if (toAdd > 0) {
                const receiveDate = new Date();
                receiveDate.setHours(12, 0, 0, 0);

                const expiredDate = new Date(receiveDate);
                expiredDate.setFullYear(receiveDate.getFullYear() + 2, 0, 1);

                // Cari existing balance untuk tahun ini
                const existingBalance = await prisma.tb_balance.findFirst({
                    where: {
                        NIK: user.NIK,
                        receive_date: {
                            gte: startOfCurrentYear,
                            lte: new Date(`${currentYear}-12-31T23:59:59`)
                        }
                    }
                });

                //console.log(`[DEBUG] NIK: ${user.NIK} - existingBalance: ${existingBalance ? 'found' : 'not found'}`);

                if (!existingBalance) {
                    // Buat balance baru
                    const resultBalance = await prisma.$transaction(async (tx) => {
                        const newBalance = await tx.tb_balance.create({
                            data: {
                                NIK: user.NIK,
                                amount: toAdd,
                                receive_date: receiveDate,
                                expired_date: expiredDate
                            }
                        });

                        const adjustmentLog = await tx.tb_balance_adjustment.create({
                            data: {
                                NIK: user.NIK,
                                adjustment_value: toAdd,
                                notes: `get ${toAdd} days of leave`,
                                created_at: new Date(),
                                actor: 'system',
                                balance_year: currentYear,
                                id_balance: newBalance.id_balance
                            }
                        });

                        return { newBalance, adjustmentLog}
                    }) 
                
                    console.log(`[Balance Created] NIK: ${user.NIK}, amount: ${toAdd}`);
                } else {
                    // Update balance existing
                    const resultBalance = await prisma.$transaction(async (tx) => {
                        const newBalance = await tx.tb_balance.update({
                            where: {
                                id_balance: existingBalance.id_balance
                            },
                            data: {
                                amount: existingBalance.amount + toAdd
                            }
                        });

                        const adjustmentLog = await tx.tb_balance_adjustment.create({
                            data: {
                                NIK: user.NIK,
                                adjustment_value: toAdd,
                                notes: `add ${toAdd} days of leave`,
                                created_at: new Date(),
                                actor: 'system',
                                balance_year: currentYear,
                                id_balance: newBalance.id_balance
                            }
                        })

                        return { newBalance, adjustmentLog}
                    })
                    
                    console.log(`[Balance Updated] NIK: ${user.NIK}, added: ${toAdd}, total: ${existingBalance.amount + toAdd}`);
                }
            } //else {
            //console.log(`[SKIP] NIK: ${user.NIK} - No additional balance needed (toAdd: ${toAdd})`);
            //}
        } //else {
        //console.log(`[SKIP] NIK: ${user.NIK} - Not eligible yet (eligibleMonths: ${eligibleMonths})`);
        // }

    } else {
        console.log(`[SKIP] NIK: ${user.NIK} statuses ${user.tb_statuses.name}`);
    }
};