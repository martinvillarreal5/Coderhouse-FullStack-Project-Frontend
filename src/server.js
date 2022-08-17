
import 'dotenv/config'
//import path from 'path'
import express, { json, urlencoded } from 'express';
import routes from './routes/index.js';
import middlewares from './utils/middlewares.js';

const app = express();


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
app.use(middlewares.errorHandler);

// start server
const port = process.env.PORT || 8080;
app.listen(port, (error) => {
    if (!error) {
        console.log(`El servidor se inicio en el puerto ${port}`);
    } else {
        console.log(`Hubo un error al iniciar el servidor: `, error);
    }
});