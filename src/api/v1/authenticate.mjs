import express from 'express';
import jwt from 'jsonwebtoken';

const key = process.env.NODE_JWT_KEY;
export const authenticateRouter = express.Router();

authenticateRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            message: 'Missing body'
        });
    }
    try {
        // const user = await userService.findByUsername(username);
        const user = {
            user_id: 1,
            username: 'admin',  
            password: 'admin'
        }
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
        const token = await jwt.sign({ user_id: user.user_id }, key);
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