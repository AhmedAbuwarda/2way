import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

// routers
import { apiRouter } from '../src/api/api-router.mjs';
import { config } from '../util/config.mjs';

const port = config.NODE_PORT;
const app = express();

//* use helmet
app.use(helmet());
//* use compression to gzip responses
app.use(compression());
//* use json to read data from body
app.use(express.json());
//* use public folder to serve static files
app.use(express.static('public'));
//* use hbs as template engine
app.set('view engine', 'hbs');
// use views folder to render templates
app.set('views', 'src/views');

// use v1Router to handle requests to /api/v1
app.use('/api', apiRouter);

//* use index.hbs to render the index page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});

//* use keep-alive endpoint to keep the server alive
app.get('/keep_alive', (req, res) => {
    return res.send({});
});


//* 404 if this endpoint not found
app.all('/*', (req, res) => {
    res.status(404).send('404 Not Found!');
});

//* start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});