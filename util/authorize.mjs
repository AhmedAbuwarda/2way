import jwt from 'jsonwebtoken';
import { config } from './config.mjs';

const key = config.NODE_JWT_KEY;

export async function authorize(req, res, next) {
    // check if user is logged in using bearer token
    const token = req.headers.authorization;
    if (token == undefined) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    try {
        await jwt.verify(token.split(' ')[1], key, async (err, user) => {
            if (err) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            } else {
                req.user = user;
                next();
            }
        });
    } catch (err) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
}