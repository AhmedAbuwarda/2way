import express from 'express';
import { MessageService } from '../services/message.mjs';

const port = process.env.NODE_PORT || 3000;
const app = express();

//* use json to read data from body
app.use(express.json());

// create message service
const messageService = new MessageService();

// get all messages
app.get('/messages', async (req, res) => {
    const messages = await messageService.getAll();
    return res.send(messages);
});

// get certain message using id
app.get('/messages/:id', async (req, res) => {
    const id = req.params.id;
    const [message] = await dbConnection.query('SELECT * FROM messages WHERE id = ? LIMIT 1', [id]);
    res.send(message);
});

// create new message
app.post('/messages', async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({
            message: 'Missing message body'
        });
    }
    try {
        await dbConnection.query('INSERT INTO messages(title, content, created_at) VALUES(?, ?, ?)', [title, content, new Date()]);
        return res.send({
            message: 'Message Created Successfully'
        });
    } catch (err) {
        if (err.errno == 1062) {
            return res.status(400).json({
                message: 'Duplicate Message'
            });
        }
    }
});

// update certain message using id
app.put('/messages/:id', async (req, res) => {
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
app.delete('/messages/:id', async (req, res) => {
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

//* 404 if this endpoint not found
app.all('/*', (req, res) => {
    res.status(404).send('404 Not Found!');
});

//* start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});