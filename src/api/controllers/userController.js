
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcrypt'
import logger from '../../utils/logger.js'
import * as userServices from '../../services/userServices.js';

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}

const loginStrategy = new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await userServices.getByUsername(username);
            if (!user) {
                return done(null, false, { message: 'Invalid Credentials.' });
            }
            if (!verifyPassword(password, user.passwordHash)) {
                return done(null, false, { message: 'Invalid Credentials.' });
            }
            return done(null, user);
        } catch (error) {
            // add error handling
            console.log("Error in Login Strategy", error);
            done("Login Error", null);
        }
    });

const registerStrategy = new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
        try {
            const existingUser = await userServices.getByUsername(username);

            if (existingUser) {
                logger.info(`Username: ${username} is already in use`)
                return done(null, false, req.flash)
                    //{ message: `Username: ${username} is already in use`});
            }

            const newUser = {
                username,
                passwordHash: hashPassword(password),
                email: req.body.email,
                //firstName: req.body.firstName,
                //lastName: req.body.lastName,
            };

            const createdUser = await userServices.saveUser(newUser);
            logger.info(`New User created: ${createdUser.username}, id: ${createdUser._id}`)
            //req.user = username;
            done(null, createdUser, {message: `New User created: ${createdUser.username}, id: ${createdUser._id}`});
        } catch (error) {
            console.log("Error in Register Strategy", error);
            done(error, null);
        }
    }
);

const getLogin = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            //let user = req.user;
            console.log("User is logged in");
            res.status(201).json('Login Ok');
            //res.render()
        } else {
            console.log("User is not logged in");
            res.render('login');
        }
    }
    catch (error) {
        next(error)
    }
}

const postLogin = (req, res, next) => {
    try {
        console.log("Is authenticated: " + req.isAuthenticated());
        res.status(201).json("Is authenticated: " + req.isAuthenticated());
    } catch (error) {
        next(error)
    }
}

const getRegister = (req, res) => {
    res.render('register');
}

const postRegister = (req, res) => {
    try {
        //console.log(req.user)
        res.status(201).json('Register Ok');
    } catch (error) {
        next(error)
    }
}

const postRegisterAlt = async (req, res, next) => {
    try {
        const existingUser = await userServices.getByUsername(req.body.username);
        if (existingUser) {
            logger.info(`Username: ${username} is already in use`)
            return res.status(409).json('Username is already in use')
        }
        await userServices.registerUser(req.body);
        return res.status(201).json('Register Ok');
    } catch (error) {
        console.log("Error in Register Strategy", error);
        next(error)
    }
}

export {
    loginStrategy,
    registerStrategy,
    getLogin,
    postLogin,
    getRegister,
    postRegister
}