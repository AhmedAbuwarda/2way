import express from 'express';
import { MessageService } from '../../../services/v2/message.mjs';

// create router
export const messageRouter = express.Router();

// create message service
const messageService = new MessageService();

// get all messages
messageRouter.get('/', async (req, res) => {
    const messages = await messageService.getAll();
    return res.send(messages);
});