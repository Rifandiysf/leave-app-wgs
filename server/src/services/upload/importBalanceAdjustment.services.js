import fs from 'fs'
import { parse } from 'fast-csv'
import { pipeline, Transform } from 'stream'
import prisma from '../../utils/client.js'
import { processDataImportBalanceAdjustment } from '../../utils/inject.utils.js'

export const importBalanceAdjustmentServices = async (path, actor) => {
    // config
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

                            await processDataImportBalanceAdjustment(data, chunkCount, tx, CHUNK_BASE, actor)

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

                            await processDataImportBalanceAdjustment(data, chunkCount, tx, CHUNK_BASE, actor)

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