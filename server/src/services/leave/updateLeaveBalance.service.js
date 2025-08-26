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

    if (user.status_active === 'resign') {
        console.log(`[SKIP] NIK: ${user.NIK} status: RESIGN`);
        return;
    }

    const currentYear = today.getFullYear();

    if (user.role === 'karyawan_tetap' || user.role === 'admin' || user.role === 'super_admin') {
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

        // BACKFILL PREVIOUS YEAR
        if (today.getMonth() === 0) { // hanya jalan di Januari
            const previousYear = currentYear - 1;

            const startOfPrevYear = new Date(previousYear, 0, 1);
            const endOfPrevYear = new Date(previousYear, 11, 31, 23, 59, 59, 999);

            // effective start tahun sebelumnya
            const effectiveStartPrev = eligibleDate > startOfPrevYear ? eligibleDate : startOfPrevYear;

            let eligibleMonthsPrev = 0;
            if (effectiveStartPrev <= endOfPrevYear) {
                eligibleMonthsPrev =
                    (endOfPrevYear.getFullYear() - effectiveStartPrev.getFullYear()) * 12 +
                    (endOfPrevYear.getMonth() - effectiveStartPrev.getMonth()) + 1;
            }

            if (eligibleMonthsPrev > 0) {
                // total leave prorata (12 setahun)
                const prorataPrev = Math.min(12, eligibleMonthsPrev);

                // cek sudah ada adjustment tahun sebelumnya (exclude backfill)
                const adjustmentsPrev = await prisma.tb_balance_adjustment.aggregate({
                    where: {
                        NIK: user.NIK,
                        actor: 'system',
                        created_at: {
                            gte: startOfPrevYear,
                            lte: endOfPrevYear
                        },
                        notes: { not: { contains: 'backfill' } }
                    },
                    _sum: { adjustment_value: true }
                });

                const alreadyGivenPrev = adjustmentsPrev._sum.adjustment_value || 0;
                const toBackfill = prorataPrev - alreadyGivenPrev;

                if (toBackfill > 0) {
                    const balancePrev = await prisma.tb_balance.findFirst({
                        where: {
                            NIK: user.NIK,
                            receive_date: { gte: startOfPrevYear, lte: endOfPrevYear }
                        }
                    });

                    const receiveDate = new Date(`${previousYear}-12-31T12:00:00.000Z`);
                    const expiredDate = new Date(`${previousYear + 2}-01-01T00:00:00.000Z`);

                    if (!balancePrev) {
                        await prisma.$transaction([
                            prisma.tb_balance.create({
                                data: {
                                    NIK: user.NIK,
                                    amount: toBackfill,
                                    receive_date: receiveDate,
                                    expired_date: expiredDate
                                }
                            }),
                            prisma.tb_balance_adjustment.create({
                                data: {
                                    NIK: user.NIK,
                                    adjustment_value: toBackfill,
                                    notes: `backfill ${toBackfill} days for year ${previousYear}`,
                                    created_at: new Date(),
                                    actor: 'system'
                                }
                            })
                        ]);
                        console.log(`[Balance Backfill Created] NIK: ${user.NIK}, ${toBackfill} days for year ${previousYear}`);
                    } else {
                        await prisma.$transaction([
                            prisma.tb_balance.update({
                                where: { id_balance: balancePrev.id_balance },
                                data: { amount: balancePrev.amount + toBackfill }
                            }),
                            prisma.tb_balance_adjustment.create({
                                data: {
                                    NIK: user.NIK,
                                    adjustment_value: toBackfill,
                                    notes: `backfill ${toBackfill} days for year ${previousYear}`,
                                    created_at: new Date(),
                                    actor: 'system'
                                }
                            })
                        ]);
                        console.log(`[Balance Backfill Updated] NIK: ${user.NIK}, added: ${toBackfill} for ${previousYear}`);
                    }
                }
            }
        }

        const adjustmentThisYear = await prisma.tb_balance_adjustment.aggregate({
            where: {
                NIK: user.NIK,
                actor: 'system',
                created_at: {
                    gte: new Date(currentYear, 0, 1, 0, 0, 0, 0), // 1 Jan 00:00:00
                    lte: new Date(currentYear, 11, 31, 23, 59, 59, 999) // 31 Dec 23:59:59
                },
                notes: {
                    not: { contains: 'backfill' }
                }
            },
            _sum : {
                adjustment_value: true
            }
        })

        const alreadyGiven = adjustmentThisYear._sum.adjustment_value || 0;

        if (alreadyGiven === 0) {
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

            if(existingBalance) {
                // update amount
                await prisma.$transaction([
                    prisma.tb_balance.update({
                        where: { id_balance: existingBalance.id_balance },
                        data: {
                            amount: existingBalance.amount + leaveAmount
                        }
                    }),
                    prisma.tb_balance_adjustment.create({
                        data: {
                            NIK: user.NIK,
                            adjustment_value: leaveAmount,
                            notes: `get ${leaveAmount} days of leave`,
                            created_at: new Date(),
                            actor: 'system'
                        }
                    })
                ]);

                console.log(`[Balance Updated] NIK: ${user.NIK}, added: ${leaveAmount}, total: ${existingBalance.amount + leaveAmount}`);
            } else {
                await prisma.$transaction([
                    prisma.tb_balance.create({
                        data: {
                            NIK: user.NIK,
                            amount: leaveAmount,
                            receive_date: receiveDate,
                            expired_date: expiredDate
                        }
                    }),
                    prisma.tb_balance_adjustment.create({
                        data: {
                            NIK: user.NIK,
                            adjustment_value: leaveAmount,
                            notes: `get ${leaveAmount} days of leave`,
                            created_at: new Date(),
                            actor: 'system'
                        }
                    })
                ]);
                console.log(`[Balance Created] NIK: ${user.NIK}, amount: ${leaveAmount}`);
            }
        } else {
            console.log(`[SKIP] NIK: ${user.NIK} - Balance for ${currentYear} already exists`);
        }

    } else if (user.role === 'karyawan_kontrak') {
        //console.log(`[DEBUG] Processing kontrak employee NIK: ${user.NIK}, today: ${today.toISOString()}`);

        // Hitung effective join date
        const joinEffective = new Date(joinDate);
        if (joinDate.getDate() > 20) {
            joinEffective.setMonth(joinEffective.getMonth() + 1);
        }
        joinEffective.setDate(1);
        //console.log(`[DEBUG] NIK: ${user.NIK}, joinEffective: ${joinEffective.toISOString()}`);

        // BACKFILL TAHUN SEBELUMNYA (hanya di Januari)
        if (today.getMonth() === 0) {
            //console.log(`[DEBUG] NIK: ${user.NIK} - Processing January backfill`);
            const previousYear = currentYear - 1;

            // Hitung eligible months untuk tahun sebelumnya
            const firstEligiblePrev = new Date(joinEffective);
            firstEligiblePrev.setMonth(firstEligiblePrev.getMonth() + 3);

            const startOfPrevYear = new Date(previousYear, 0, 1, 0, 0, 0, 0)
            const endOfPrevYear = new Date(previousYear, 11, 31, 23, 59, 59, 999)

            // Effective start untuk tahun sebelumnya
            const effectiveStartPrev = firstEligiblePrev > startOfPrevYear ? firstEligiblePrev : startOfPrevYear;

            // Hitung total eligible months di tahun sebelumnya
            let eligibleMonthsPrev = 0;
            if (effectiveStartPrev <= endOfPrevYear) {
                eligibleMonthsPrev = (endOfPrevYear.getFullYear() - effectiveStartPrev.getFullYear()) * 12 +
                    (endOfPrevYear.getMonth() - effectiveStartPrev.getMonth()) + 1;
            }

            //console.log(`[DEBUG] NIK: ${user.NIK} - Previous year eligible months: ${eligibleMonthsPrev}`);

            if (eligibleMonthsPrev > 0) {
                // Hitung total yang sudah diberikan untuk tahun sebelumnya (EXCLUDE backfill)
                const adjustmentsPrev = await prisma.tb_balance_adjustment.aggregate({
                    where: {
                        NIK: user.NIK,
                        actor: 'system',
                        created_at: {
                            gte: startOfPrevYear,
                            lte: endOfPrevYear
                        },
                        notes: {
                            not: { contains: 'backfill' }
                        }
                    },
                    _sum: {
                        adjustment_value: true
                    }
                });

                const alreadyGivenPrev = adjustmentsPrev._sum.adjustment_value || 0;
                const toBackfill = eligibleMonthsPrev - alreadyGivenPrev;

                //console.log(`[DEBUG] NIK: ${user.NIK} - Already given prev year: ${alreadyGivenPrev}, to backfill: ${toBackfill}`);

                if (toBackfill > 0) {
                    const startOfPrevYear = new Date(`${previousYear}-01-01T00:00:00.000Z`);
                    const endOfPrevYear = new Date(`${previousYear}-12-31T23:59:59.999Z`);
                    
                    //console.log(`[DEBUG] Searching balance for NIK: ${user.NIK}, year: ${previousYear}, range: ${startOfPrevYear.toISOString()} - ${endOfPrevYear.toISOString()}`);
                    
                    const balancePrev = await prisma.tb_balance.findFirst({
                        where: {
                            NIK: user.NIK,
                            receive_date: {
                                gte: startOfPrevYear,
                                lte: endOfPrevYear
                            }
                        }
                    });

                    //console.log(`[DEBUG] Found existing balance for ${previousYear}: ${balancePrev ? 'YES' : 'NO'}`);

                    if (!balancePrev) {
                        // Buat tanggal dengan format yang eksplisit
                        const receiveDate = new Date(`${previousYear}-12-31T12:00:00.000Z`);
                        const expiredDate = new Date(`${previousYear + 2}-01-01T00:00:00.000Z`);
                        
                        // console.log(`[DEBUG BACKFILL] NIK: ${user.NIK}`);
                        // console.log(`[DEBUG BACKFILL] previousYear: ${previousYear}`);
                        // console.log(`[DEBUG BACKFILL] receiveDate: ${receiveDate.toISOString()}`);
                        // console.log(`[DEBUG BACKFILL] expiredDate: ${expiredDate.toISOString()}`);
                        // console.log(`[DEBUG BACKFILL] toBackfill: ${toBackfill}`);
                        
                        await prisma.$transaction([
                            prisma.tb_balance.create({
                                data: {
                                    NIK: user.NIK,
                                    amount: toBackfill,
                                    receive_date: receiveDate,
                                    expired_date: expiredDate
                                }
                            }),
                            prisma.tb_balance_adjustment.create({
                                data: {
                                    NIK: user.NIK,
                                    adjustment_value: toBackfill,
                                    notes: `backfill ${toBackfill} days for year ${previousYear}`,
                                    created_at: new Date(),
                                    actor: 'system'
                                }
                            })
                        ]);
                        console.log(`[Balance Backfill Created] NIK: ${user.NIK}, amount: ${toBackfill} for year ${previousYear}, receive: ${receiveDate.toISOString()}, expire: ${expiredDate.toISOString()}`);
                    } else {
                        await prisma.$transaction([
                            prisma.tb_balance.update({
                                where: {
                                    id_balance: balancePrev.id_balance
                                },
                                data: {
                                    amount: balancePrev.amount + toBackfill
                                }
                            }),
                            prisma.tb_balance_adjustment.create({
                                data: {
                                    NIK: user.NIK,
                                    adjustment_value: toBackfill,
                                    notes: `backfill ${toBackfill} days for year ${previousYear}`,
                                    created_at: new Date(),
                                    actor: 'system'
                                }
                            })
                        ]);
                        console.log(`[Balance Backfill] NIK: ${user.NIK}, added: ${toBackfill} to ${previousYear}`);
                    }
                } 
            }
        }

        // PERHITUNGAN UNTUK TAHUN BERJALAN
        //console.log(`[DEBUG] NIK: ${user.NIK} - Processing current year: ${currentYear}`);

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
                    created_at: {
                        gte: new Date(currentYear, 0, 1, 0, 0, 0, 0),           // 1 Jan 00:00:00 local time
                        lte: new Date(currentYear, 11, 31, 23, 59, 59, 999)    // 31 Dec 23:59:59 local time

                    },
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
                    await prisma.$transaction([
                        prisma.tb_balance.create({
                            data: {
                                NIK: user.NIK,
                                amount: toAdd,
                                receive_date: receiveDate,
                                expired_date: expiredDate
                            }
                        }),
                        prisma.tb_balance_adjustment.create({
                            data: {
                                NIK: user.NIK,
                                adjustment_value: toAdd,
                                notes: `get ${toAdd} days of leave`,
                                created_at: new Date(),
                                actor: 'system'
                            }
                        })
                    ]);
                    console.log(`[Balance Created] NIK: ${user.NIK}, amount: ${toAdd}`);
                } else {
                    // Update balance existing
                    await prisma.$transaction([
                        prisma.tb_balance.update({
                            where: {
                                id_balance: existingBalance.id_balance
                            },
                            data: {
                                amount: existingBalance.amount + toAdd
                            }
                        }),
                        prisma.tb_balance_adjustment.create({
                            data: {
                                NIK: user.NIK,
                                adjustment_value: toAdd,
                                notes: `add ${toAdd} days of leave`,
                                created_at: new Date(),
                                actor: 'system'
                            }
                        })
                    ]);
                    console.log(`[Balance Updated] NIK: ${user.NIK}, added: ${toAdd}, total: ${existingBalance.amount + toAdd}`);
                }
            } //else {
            //console.log(`[SKIP] NIK: ${user.NIK} - No additional balance needed (toAdd: ${toAdd})`);
            //}
        } //else {
        //console.log(`[SKIP] NIK: ${user.NIK} - Not eligible yet (eligibleMonths: ${eligibleMonths})`);
        // }

    } else {
        console.log(`[SKIP] NIK: ${user.NIK} role: magang`);
    }
};