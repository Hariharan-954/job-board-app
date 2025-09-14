import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { wrappedConsole } from '../functions/logger.js';
import { decryptRSA } from '../utils/decrypt.js';

dotenv.config();

export const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        wrappedConsole('/login', 'POST', 'start');
        const { credentials = '' } = req.body;

        if (!credentials) {
            wrappedConsole('/login', 'POST', 'failed - no credentials');
            return res.status(400).json({ status: 'missing', message: 'Credentials not provided' });
        }

        const decryptedData = JSON.parse(decryptRSA(credentials));
        const { email = '', password = '' } = decryptedData;

        if (email === process.env.DEMO_EMAIL && password === process.env.DEMO_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

            wrappedConsole('/login', 'POST', 'success');
            return res.status(200).json({ status: 'success', token });
        } else {
            wrappedConsole('/login', 'POST', 'failed - invalid credentials');
            return res.status(200).json({ status: 'invalid', message: 'Invalid credentials' });
        }

    } catch (err) {
        wrappedConsole('/login', 'POST', 'failed - exception');
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

router.get('/verify-token', (req, res) => {

    wrappedConsole('/verify-token', 'GET', 'start');
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        wrappedConsole('/verify-token', 'GET', 'Success');
        return res.status(200).json({ valid: true, user: decoded });

    } catch (error) {
        wrappedConsole('/verify-token', 'GET', 'failed');
        return res.status(401).json({ error: 'Token is invalid or expired' });
    }
});

