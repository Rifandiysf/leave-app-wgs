import dotenv from 'dotenv';

dotenv.config({path: `.env.development`})

export const {
    PORT, NODE_ENV, HOSTNAME, SESSION_SECRET
} = process.env