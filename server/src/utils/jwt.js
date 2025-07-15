import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

export function generateToken(payload, expiresIn = '24h') {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token){
    return jwt.verify(token, JWT_SECRET);
}
