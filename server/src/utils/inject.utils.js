import { v4 as uuid } from 'uuid'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const processData = async (data, number, tx) => {
    let count = 0;
    let dataLeave = []
    let dataLog = []
    let dataBalance = []
    let dataUser = []

    try {
        for (const item of data) {
            switch (item.target_table) {
                case 'leave':
                    const leaveData = modifyLeaveData(item);
                    dataLeave.push(leaveData)

                    if (item.status !== 'pending') {
                        let leaveLogData = createLeaveLogData(leaveData, item.changed_by_nik);
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
            }



            console.log(`LINES ${count}: `, item, '\n');
            console.log('TOTAL CHUNK ', count, '\n');
            count++;
        }

        console.log(dataLeave);

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

        console.log('TOTAL DATA RECEIVED: ', number);
    } catch (error) {
        console.log(error)
        throw error
    }
}

const modifyLeaveData = (data) => {

    const startDate = new Date(data.start_date)
    const endDate = new Date(data.end_date)

    const result = {
        id_leave: uuid(),
        title: data.title,
        leave_type: data.leave_type,
        start_date: startDate,
        end_date: endDate,
        total_days: Number(data.total_days),
        reason: "added by inject to database",
        status: 'approved',
        created_at: new Date(),
        NIK: data.NIK
    }

    return result;
}

const createLeaveLogData = (data, changed_by_nik) => {
    const result = {
        id_leave: data.id_leave,
        old_status: 'pending',
        new_status: data.status,
        reason: 'Added by injecting data into database',
        changed_by_nik: changed_by_nik,
        changed_at: new Date(),
        balances_used: [],

    }

    return result
}

const modifyBalanceData = (data) => {
    const receive = new Date(data.receive_date)
    const expired = new Date(data.expired_date)
    const result = {
        amount: Number(data.amount),
        receive_date: receive,
        expired_date: expired,
        NIK: data.NIK
    }

    return result
}

const modifyUserData = (data) => {
    const result = {
        NIK: data.NIK,
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        gender: data.gender,
        role: data.role,
        status_active: data.status_active,
        join_date: new Date(data.join_date)
    }

    return result;
}