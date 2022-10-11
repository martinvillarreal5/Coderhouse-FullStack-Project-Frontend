import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import middleware from "./middleware/middlewares.js";
import handleRouteErrors from "./middleware/errorMiddleware.js";
import router from "./routes/index.js";
import { serverConfig, databaseConfig } from "../config/index.js";
import { getUserById } from "../services/userServices.js";
import { loginStrategy } from "./controllers/userController.js";
//import { fileURLToPath } from 'url';
//import path, { dirname } from 'path'

export default function initializeExpressApp() {
  const expressApp = express();
  expressApp.use(
    cors({
      // Set this in espeficic routes that need it, or use a middleware?
      origin: ["http://localhost:5173"],
      credentials: true,
    })
  ); //Do not enable CORS for all routes in a production application. This can lead to security vulnerabilities

  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json());

  expressApp.set("view engine", "ejs");
  expressApp.use("/public", express.static("public")); // TODO use dirname

  expressApp.use(cookieParser());
  /*
    const isLocal = env === 'development'
    if (!isLocal) {
        app.set('trust proxy', 1)
    }
    */
  expressApp.use(
    session({
      secret: serverConfig.secret,
      store: MongoStore.create({ mongoUrl: databaseConfig.mongoDbUrl }),
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      },
      rolling: true,
      resave: false,
      saveUninitialized: false /* 
            keys: [],
            secure: !isLocal */,
    })
  );

  expressApp.use(passport.initialize());
  expressApp.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      if (user) {
        return done(null, user); // return valid object if user exists in our database
      } else {
        return done(null, false); // return false if user doesn't exists
      }
    } catch (error) {
      return done(error, false);
    }
  });

  passport.use("login", loginStrategy);

  //expressApp.use(middleware.requestLogger);
  expressApp.get("/", (req, res) => {
    res.send("Hello World!");
  });

  expressApp.use("/", router);
  expressApp.use(handleRouteErrors);
  expressApp.use(middleware.unknownEndpoint);
  return expressApp;
}
