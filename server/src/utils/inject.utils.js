import { v4 as uuid } from 'uuid'
import { Prisma } from '../../generated/prisma/client.js';
import { balanceAdjustmentSchema, balanceSchema, leaveLogSchema, leaveSchema, userSchema, validateInjectDataType } from '../validators/inject.validator.js';
import { create } from 'domain';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const processData = async (data, number, tx, CHUNK_BASE, requestNIK) => {
    let count = 0;
    let dataLeave = []
    let dataLog = []
    let dataBalance = []
    let dataUser = []
    let dataBalanceAdjustment = []

    try {
        for (const item of data) {
            switch (item.target_table) {
                case 'leave':
                    const leaveData = modifyLeaveData(item);
                    dataLeave.push(leaveData)

                    if (item.status !== 'pending') {
                        let leaveLogData = modifyLeaveLogData(item, leaveData, requestNIK);
                        dataLog.push(leaveLogData)
                    }
                    
                    break;

                case 'balance':
                    const balanceData = modifyBalanceData(item);
                    dataBalance.push(balanceData)
                    break;

                case 'user':
                    const userData = modifyUserData(item)
                    dataUser.push(userData)
                    break;
                case 'balance_adjustment' :
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

        console.log('TOTAL DATA RECEIVED: ', number);
    } catch (error) {
        error.statusCode = 400;

        let detail = '';
        let startLine = (number - CHUNK_BASE) < 0 ? 0 : number - CHUNK_BASE;
        let endLine = number + 1;

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
            error.message = "There's duplicate data in the database.";
            }
        }

        error.cause = {
            lines_between: `${startLine}-${endLine}`,
            reason: detail
        }

        throw error
    }
}

const modifyLeaveData = (data) => {
    try {
        const startDate = new Date(data.start_date_leave)
        const endDate = new Date(data.end_date_leave)

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

const modifyLeaveLogData = (data, leaveData, requestNIK) => {
    try {
        const result = {
            id_leave: leaveData.id_leave,
            old_status: data.old_status_leave_log_o || 'pending',
            new_status: data.status_leave_o,
            reason: data.reason_leave_log_o || 'Added by injecting data into database',
            changed_by_nik: data.changed_by_nik_leave_log_o || requestNIK,
            changed_at: data.changed_at_leave_log_o ? new Date(data.changed_at_leave_log_o) : new Date(),
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
        const receive = new Date(data.receive_date_balance)

        const expired = data.expired_date ? new Date(data.expired_date_balance_o) : new Date(receive.getFullYear() + 2, 0, 1);
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

const modifyUserData = (data) => {
    try {
        const result = {
            NIK: data.NIK,
            fullname: data.fullname_user,
            email: data.email_user,
            password: data.password_user,
            gender: data.gender_user,
            role: data.role_user,
            status_active: data.status_active_user,
            join_date: new Date(data.join_date_user)
        }

       validateInjectDataType(userSchema, result);

        return result;
    } catch (error) {
        throw error;
    }
}

const modifyBalanceAdjustmentData = (data) => {
    try {
        const created_at = data.created_at_balance_adjustment_o ? new Date(data.created_at_balance_adjustment_o) : new Date();
        created_at.setHours(0,0,0)
        
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