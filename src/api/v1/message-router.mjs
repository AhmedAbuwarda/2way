import express from 'express';
import { MessageService } from '../../../services/v1/message.mjs';
import { authorize } from '../../../util/authorize.mjs';
// import { sequelize } from '../../../util/db-connection.mjs';

// create router
export const messageRouter = express.Router();
// create message service
const messageService = new MessageService();
// use authorize middleware
messageRouter.use(authorize);

// get all messages
messageRouter.get('/', async (req, res) => {

    const user_id = req.user.user_id;
    const messages = await messageService.findAll(user_id);
    return res.send(messages);
});

// get certain message using id
messageRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const [message] = await dbConnection.query('SELECT * FROM messages WHERE id = ? LIMIT 1', [id]);
    res.send(message);
});

// create new message
messageRouter.post('/', async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({
            message: 'Missing body'
        });
    }
    try {
        await messageService.create({ content });
        return res.status(201).send({
            message: 'Message Created Successfully'
        });
    } catch (err) {
        if (err) {
            return res.status(400).json({
                message: err.sqlMessage
            });
        }
    }
});

// update certain message using id
messageRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {title, content} = req.body;
    try {
        await dbConnection.query('UPDATE messages SET title = ?, content = ? WHERE id = ?', [title, content, id]);
        return res.json({
            message: 'Message Updated Successfully'
        });
    } catch (err) {
        if (err.errno == 1062) {
            return res.status(400).json({
                message: 'Duplicate Message'
            });
        }
        return res.status(400).json({
            message: 'Message Not Found'
        });
    }
});

// delete certain message using id
messageRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        await dbConnection.query('DELETE FROM messages WHERE id = ?', [id]);
        return res.json({
            message: 'Message Deleted Successfully',
        });
    } catch (err) {
        return res.status.json({
            message: 'Message Not Found!'
        });
    }
});