import dotenv from 'dotenv';
dotenv.config();
console.log('DATABASE_URL loaded:', process.env.DATABASE_URL)
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export default prisma;