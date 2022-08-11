import express from 'express';
import helmet from 'helmet';
// routers
import { apiRouter } from '../src/api/api-router.mjs';
import { config } from '../util/config.mjs';

const port = config.NODE_PORT;
const app = express();

//* use helmet
app.use(helmet());
//* use json to read data from body
app.use(express.json());

// use v1Router to handle requests to /api/v1
app.use('/api', apiRouter);

//* 404 if this endpoint not found
app.all('/*', (req, res) => {
    res.status(404).send('404 Not Found!');
});

//* start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});