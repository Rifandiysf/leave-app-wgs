import prisma from '../utils/client.js'
import fs from 'fs';
import { parse, format } from 'fast-csv';
import { pipeline, Transform } from "stream";
import { processData } from "../utils/inject.utils.js";

export const importFileServices = async (path, requestNIK) => {

    //config
    const CHUNK_BASE = 10

    let data = []
    let chunkCount = 0

    // stream 
    const readable = fs.createReadStream(path)
    const parser = parse({
        delimiter: ";",
        headers: true
    })

    try {
        const process = await prisma.$transaction(async (tx) => {
            const transform = new Transform({
                objectMode: true,
                async transform(chunk, encoding, cb) {
                    try {
                        data.push(chunk)
                        if (data.length === CHUNK_BASE) {

                            await processData(data, chunkCount, tx, CHUNK_BASE, requestNIK)

                            data = []
                        }

                        chunkCount++
                        cb()
                    } catch (error) {
                        cb(error)
                    }
                },
                async flush(cb) {
                    try {
                        console.log("Flushing remaining data...")
                        if (data.length > 0) {

                            await processData(data, chunkCount, tx, CHUNK_BASE, requestNIK)

                            data = []
                        }
                        
                        cb()
                    } catch (error) {
                        cb(error)
                    }
                }
            })

            await new Promise((resolve, reject) => {
                pipeline(readable, parser, transform, async (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                })
            });
        }, {
            timeout: 60000000,
            maxWait: 6000
        }).catch(function (rej) {
            throw rej
        })

        const result = {
            data_received: chunkCount,
        }

        return result;
    } catch (error) {
        throw error
    }
}


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
