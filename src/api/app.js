import express from 'express';
import cors from 'cors'
import middleware from '../utils/middlewares.js'
import handleRouteErrors from '../utils/errorMiddleware.js';
import router from './routes/index.js';
import { serverConfig } from '../config/index.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo'
//import { connection } from 'mongoose';
import mongoDbUrl from '../config/database.js';

export default function initializeExpressApp() {
    const expressApp = express();
    expressApp.use(cors());

    expressApp.use(express.urlencoded({ extended: true }));
    expressApp.use(express.json());

    expressApp.set('view engine', 'ejs');

    expressApp.use(cookieParser())
    /*
    const isLocal = env === 'development'
    if (!isLocal) {
        app.set('trust proxy', 1)
    }
    */
    expressApp.use(
        session({
            secret: serverConfig.secret,
            store: MongoStore.create({ mongoUrl: mongoDbUrl }),
            cookie: {
                httpOnly: false,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
            },
            rolling: true,
            resave: false,
            saveUninitialized: false,/* 
            keys: [],
            secure: !isLocal */
        })
    );
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
