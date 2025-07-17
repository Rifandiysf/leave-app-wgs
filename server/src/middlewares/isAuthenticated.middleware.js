
import jwt from 'jsonwebtoken';
import { SESSION_SECRET } from '../config/env.js';

export const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }


    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SESSION_SECRET);
        console.log("Decoded token:", decoded); 
        req.user = decoded;
        next(); 
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};