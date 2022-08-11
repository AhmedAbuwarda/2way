import express from 'express';
import jwt from 'jsonwebtoken';

import { userService } from '../../../services/v1/user.mjs';
import { config } from '../../../util/config.mjs';

const key = config.NODE_JWT_KEY;
export const authenticateRouter = express.Router();

// create new userService
const User = new userService();

authenticateRouter.post('/login', async (req, res) => {
    // get username and password from request body
    const { username, password } = req.body;
    // check if username and password are set
    if (!username || !password) {
        return res.status(400).json({
            message: 'Missing body'
        });
    }
    try {

        const user = await User.findByUsername(username);
        // check if user exists or empty
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }
        if (user.password !== password) {
            return res.status(400).json({
                message: 'Invalid password'
            });
        }
        const token = await jwt.sign({ user_id: user.id, user_type: "user" }, key, { expiresIn: '1w' });
        return res.json({
            token
        });
    } catch (err) {
        return res.status(400).json({
            message: err.sqlMessage
        });
    }
});

// logout post
authenticateRouter.post('/logout', async (req, res) => {
    // TODO: implement logout
    delete req.user;
    return res.json({
        message: 'Logged out successfully'
    });
});