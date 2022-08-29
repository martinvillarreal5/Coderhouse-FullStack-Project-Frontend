

import express from 'express';
import cors from 'cors'
import middleware from '../utils/middlewares.js'
import handleRouteErrors from '../utils/errorMiddleware.js';
import router from './routes/index.js';

export default function initializeExpressApp() {
    const expressApp = express();
    expressApp.use(cors());
    expressApp.use(express.urlencoded({ extended: true }));
    expressApp.use(express.json());

    expressApp.use(middleware.requestLogger);
    expressApp.get('/', (req, res) => {
        res.send('Hello World!')
    })

    expressApp.use('/', router);
    expressApp.use(handleRouteErrors)
    //handleRouteErrors(expressApp);
    expressApp.use(middleware.unknownEndpoint)
    return expressApp;
} 
