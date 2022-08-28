
import 'dotenv/config'
//import path from 'path'
import express, { json, urlencoded } from 'express';
import cors from 'cors'
import routes from './routes/index.js';
import middlewares from './utils/middlewares.js';
import errorMiddleware from './utils/errorMiddleware.js';

const app = express();

// cors middleware
app.use(cors())

// post url encode middleware
app.use(json());
app.use(urlencoded({ extended: true }));
//app.use('/', express.static(path.join(__dirname + '../public')));

// Request Logger Middleware
app.use(middlewares.requestLogger);

// Routes
app.use('/', routes);

// not found Middleware
app.use(middlewares.unknownEndpoint);

// error handler
app.use(errorMiddleware);

// start server
//separate to diferent file: app and server are diferent
const port = process.env.PORT || 8080;
app.listen(port, (error) => {
    if (!error) {
        console.log(`El servidor se inicio en el puerto ${port}`);
    } else {
        console.log(`Hubo un error al iniciar el servidor: `, error);
    }
});