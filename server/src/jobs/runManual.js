import dotenv from 'dotenv';
dotenv.config();

import { expiredLeave } from '../services/leave.service.js';
import prisma from '../utils/client.js';


const run = async () => {
  console.time('runExpiredLeave');
  await expiredLeave();
  await prisma.$disconnect();
  console.timeEnd('runExpiredLeave');
};

run();
