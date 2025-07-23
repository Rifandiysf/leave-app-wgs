import dotenv from 'dotenv';

dotenv.config({path: `.env`})

export const {
    PORT, NODE_ENV, HOSTNAME, JWT_SECRET
} = process.env