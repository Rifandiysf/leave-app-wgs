import { v4 as uuid } from 'uuid'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const processData = async (data, number, tx) => {
    let count = 0;
    let dataLog = []

    try {
        for (const item of data) {
            modifyLeaveData(item);

            if (item.status !== 'pending') {
                let leaveLogData = createLeaveLogData(item);
                dataLog.push(leaveLogData)
            }

            console.log(`LINES ${count}: `, item, '\n');
            console.log('TOTAL CHUNK ', count, '\n');
            count++;
        }


        console.log(dataLog);

        await tx.tb_leave.createMany({
            data: data
        })
        await tx.tb_leave_log.createMany({
            data: dataLog
        })

        console.log('TOTAL DATA RECEIVED: ', number);
    } catch (error) {
        console.log(error)
        throw error
    }
}

const modifyLeaveData = (data) => {
    const startDate = data.start_date
    const endDate = data.end_date

    data.total_days = Number(data.total_days)
    data.id_leave = uuid()
    data.start_date = new Date(startDate)
    data.end_date = new Date(endDate)
}

const createLeaveLogData = (data) => {
    return {
        id_leave: data.id_leave,
        old_status: 'pending',
        new_status: data.status,
        reason: 'Added by injecting data into database',
        changed_by_nik: '100001',
        changed_at: new Date(),
        balances_used: []
    }
}