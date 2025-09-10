import { v4 as uuid } from 'uuid'
import { Prisma, status } from '../../generated/prisma/client.js';
import { balanceAdjustmentSchema, balanceSchema, importBalanceAdjustmentSchema, leaveLogSchema, leaveSchema, userSchema, validateInjectDataType } from '../validators/inject.validator.js';
import prisma from './client.js';
import { adjustModifyAmount } from '../services/user-balance/adjustModifyAmount.service.js';
import { createDateFromString } from './leaves.utils.js';

export const processData = async (data, number, tx, CHUNK_BASE, actor) => {
    let count = 0;
    let dataLeave = []
    let dataLog = []
    let dataBalance = []
    let dataUser = []
    let dataBalanceAdjustment = []
    let dataBalanceAdjustmentCreated = []

    try {
        for (const item of data) {
            switch (item.target_table) {
                case 'leave':
                    const leaveData = modifyLeaveData(item);
                    dataLeave.push(leaveData)

                    if (item.status_leave_o !== 'pending') {
                        let leaveLogData = modifyLeaveLogData(item, leaveData, actor);
                        dataLog.push(leaveLogData)
                    }

                    break;

                case 'balance':
                    const balanceData = modifyBalanceData(item);
                    const balanceAdjustmentData = createBalanceAdjustmentData(balanceData);
                    dataBalance.push(balanceData)
                    dataBalanceAdjustmentCreated.push(balanceAdjustmentData)
                    break;

                case 'user':
                    const userData = await modifyUserData(item)
                    dataUser.push(userData)
                    break;
                case 'balance_adjustment':
                    const balanceUdjestmentData = modifyBalanceAdjustmentData(item)
                    dataBalanceAdjustment.push(balanceUdjestmentData)
                    break;

                default:
                    const error = new Error("Invalid target table value");
                    error.statusCode = 400;
                    throw error;
            }

            console.log(`LINES ${count}: `, item, '\n');
            count++;
        }

        if (dataUser.length > 0) {
            await tx.tb_users.createMany({
                data: dataUser
            })
        }

        if (dataLeave.length > 0) {
            await tx.tb_leave.createMany({
                data: dataLeave
            })
        }

        if (dataLog.length > 0) {
            await tx.tb_leave_log.createMany({
                data: dataLog
            })
        }

        if (dataBalance.length > 0) {
            await tx.tb_balance.createMany({
                data: dataBalance
            })
        }

        if (dataBalanceAdjustment.length > 0) {
            await tx.tb_balance_adjustment.createMany({
                data: dataBalanceAdjustment
            })
        }

        if (dataBalanceAdjustmentCreated.length > 0) {
            await tx.tb_balance_adjustment.createMany({
                data: dataBalanceAdjustmentCreated
            })
        }

        console.log('TOTAL DATA RECEIVED: ', number);
    } catch (error) {
        error.statusCode = 400;

        let startLine = (number - CHUNK_BASE) < 0 ? 0 : number - CHUNK_BASE;
        let endLine = number + 1;

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                error.message = "There's duplicate data in the database.";
            }
        }

        error.cause = {
            lines_between: `${startLine}-${endLine}`,
        }

        throw error
    }
}

export const processDataImportBalanceAdjustment = async (data, chunkCount, tx, CHUNK_BASE, actor) => {
    let count = 0
    const balance_year = {
        current: "this_year_leave",
        last_year: "last_year_leave",
        last_two_year: "last_two_year"
    }

    try {

        for (const item of data) {
            count++;

            const modifiedData = {
                NIK: item.NIK,
                amount: Number(item.amount),
                notes: item.notes,
                leave_balances: item.leave_balances
            }

            validateInjectDataType(importBalanceAdjustmentSchema, modifiedData)

            const targetUser = await prisma.tb_users.findFirst({
                where: {
                    NIK: item.NIK
                },
                include: {
                    tb_roles: true,
                    tb_statuses: true
                }
            })

            const operation = modifiedData.amount >= 0 ? "add_amount" : "reduce_amount"
            modifiedData.amount = modifiedData.amount >= 0 ? modifiedData.amount : Math.abs(modifiedData.amount)

            if (!targetUser) {
                const error = new Error(`User with NIK ${modifiedData.NIK} not found.`);
                error.statusCode = 404;
                throw error;
            }

            const result = await adjustModifyAmount(
                modifiedData.NIK,
                modifiedData.amount,
                modifiedData.notes,
                actor,
                targetUser.tb_roles.slug,
                balance_year[modifiedData.leave_balances],
                operation
            )
        }

        console.log("Balance Adjustment data imported successfully. \nTotal data received: ", chunkCount)
    } catch (error) {
        const errorLine = chunkCount <= CHUNK_BASE ? count : chunkCount - CHUNK_BASE + count + 1;

        error.statusCode = 400
        error.cause = error.message
        error.message = `An error occurred in the data input on CSV file at line ${errorLine}`

        throw error;
    }
}

const modifyLeaveData = (data) => {
    try {
        const startDate = createDateFromString(new Date(data.start_date_leave))
        const endDate = createDateFromString(new Date(data.end_date_leave))

        const result = {
            id_leave: data.id || uuid(),
            title: data.title_leave,
            leave_type: data.type_leave,
            start_date: startDate,
            end_date: endDate,
            total_days: Number(data.total_days_leave),
            reason: data.reason_leave_o || data.title_leave,
            status: data.status_leave_o || 'pending',
            created_at: new Date(),
            NIK: data.NIK
        }

        validateInjectDataType(leaveSchema, result);

        return result;
    } catch (error) {
        throw error;
    }
}

const modifyLeaveLogData = (data, leaveData, actor) => {
    try {
        const result = {
            id_leave: leaveData.id_leave,
            old_status: data.old_status_leave_log_o || 'pending',
            new_status: data.status_leave_o,
            reason: data.reason_leave_log_o || 'Added by injecting data into database',
            changed_by_nik: data.changed_by_nik_leave_log_o !== null && data.changed_by_fullname_leave_log_o !== null ? data.changed_by_nik_leave_log_o : actor.NIK,
            actor_fullname: data.changed_by_nik_leave_log_o !== null && data.changed_by_fullname_leave_log_o !== null ? data.changed_by_fullname_leave_log_o : actor.fullName,
            changed_at: data.changed_at_leave_log_o ? createDateFromString(new Date(data.changed_at_leave_log_o)) : new Date(),
            balances_used: [],
        }

        validateInjectDataType(leaveLogSchema, result);

        return result
    } catch (error) {
        throw error;
    }
}

const modifyBalanceData = (data) => {
    try {
        const receive = createDateFromString(new Date(data.receive_date_balance))

        const expired = data.expired_date ? createDateFromString(new Date(data.expired_date_balance_o)) : createDateFromString(new Date(receive.getFullYear() + 2, 3, 1, 0, 0, 0, 0));
        const result = {
            id_balance: data.id || uuid(),
            amount: Number(data.amount_balance),
            receive_date: receive,
            expired_date: expired,
            NIK: data.NIK
        }

        validateInjectDataType(balanceSchema, result);

        return result
    } catch (error) {
        throw error;
    }
}

const modifyUserData = async (data) => {
    try {
        const isMale = data.gender_user === "male";
        const isActive = data.status_active_user === "active";

        const role = await prisma.tb_roles.findFirst({
            where: {
                slug: {
                    contains: data.role_user,
                    mode: "insensitive"
                }
            }
        })

        if (!role) {
            const error = new Error("Value for column role_user is invalid");
            error.statusCode = 400;
            throw error;
        }

        const employee_status = await prisma.tb_statuses.findFirst({
            where: {
                name: {
                    contains: data.employee_status_user,
                    mode: "insensitive"
                }
            }
        })

        if (!employee_status) {
            const error = new Error("Value for column role_user is invalid");
            error.statusCode = 400;
            throw error;
        }

        const result = {
            NIK: data.NIK,
            fullname: data.fullname_user,
            email: data.email_user,
            password: data.password_user,
            isMale: isMale,
            role_id: role.id,
            status_id: employee_status.id,
            isActive: isActive,
            join_date: createDateFromString(new Date(data.join_date_user))
        }

        validateInjectDataType(userSchema, result);

        console.log(result);

        return result;
    } catch (error) {
        throw error;
    }
}

const modifyBalanceAdjustmentData = (data) => {
    try {
        const created_at = data.created_at_balance_adjustment_o ? createDateFromString(new Date(data.created_at_balance_adjustment_o)) : createDateFromString(new Date());

        const result = {
            id_adjustment: data.id || uuid(),
            NIK: data.NIK,
            adjustment_value: Number(data.value_balance_adjustment),
            notes: data.notes_balance_adjustment,
            actor: data.actor_balance_adjustment,
            balance_year: Number(data.balance_year_balance_adjustment),
            created_at: created_at,
            id_balance: data.id_balance_balance_adjustment_o || undefined
        }

        validateInjectDataType(balanceAdjustmentSchema, result);

        return result;
    } catch (error) {
        throw error;
    }
}

const createBalanceAdjustmentData = (data) => {
    try {
        const balance_year = data.receive_date.getFullYear()
        const result = {
            id_adjustment: uuid(),
            NIK: data.NIK,
            adjustment_value: data.amount,
            notes: "Added by injecting data balance into database",
            actor: "system",
            balance_year: balance_year,
            created_at: new Date(),
            id_balance: data.id_balance
        }

        validateInjectDataType(balanceAdjustmentSchema, result);

        return result
    } catch (error) {
        throw error
    }
}