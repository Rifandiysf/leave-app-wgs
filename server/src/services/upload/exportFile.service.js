import prisma from '../../utils/client.js'
import fs from 'fs';
import { format } from 'fast-csv';

export const exportFileServices = async (target) => {
    let result = []
    try {
        console.log('target', target)
        switch (target) {
            case 'leave':
                result = await prisma.tb_leave.findMany({
                    select: {
                        title: true,
                        leave_type: true,
                        start_date: true,
                        end_date: true,
                        total_days: true,
                        NIK: true
                    }
                });
                break;
            case 'user':
                result = await prisma.tb_users.findMany()
                break;
            case 'balance':
                result = await prisma.tb_balance.findMany({})
                break;
            case 'log':
                result = await prisma.tb_leave_log.findMany({
                    omit: {
                        new_status: true,
                        old_status: true,
                        id_leave: true
                    }
                })
                break;
            default:
                break;
        }

        const writeable = fs.createWriteStream('./src/temp/result.csv');
        const write = format({ headers: true, delimiter: ';' });

        write.pipe(writeable);

        result.forEach(row => write.write(row));

        write.end();

        return new Promise((resolve, reject) => {
            writeable.on('finish', () => {
                console.log('Finish writing data');
                resolve({ success: true, count: result.length });
            });
            writeable.on('error', reject);
        });

    } catch (error) {
        throw error;
    }
};