
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcrypt'
import logger from '../../utils/logger.js'
import * as userServices from '../../services/userServices.js';

function verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}

const loginStrategy = new LocalStrategy(
    async (username, password, done) => {
        try {
            logger.info("Login strategy ")
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


const getUserInfo = (req, res,next) => {
    try {
        res.json({
            username: req.user.username,
            firstName: req.user.firstName|| "no first name",
            lastName: req.user.lastName || "no last bane",
            email: req.user.email
        })
    } catch (error) {
        next(error)
    }
}

const getLogin = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            //let user = req.user;
            console.log("User is logged in");
            res.status(201).json('Login Ok');
            //res.render()
        } else {
            console.log("User is not logged in");
            //res.render('login');
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

const postRegister = async (req, res, next) => {
    try {
        const existingUser = await userServices.getByUsername(req.body.username);
        // make a get by email to verify duplicates
        if (existingUser) {
            logger.info(existingUser)
            logger.info(`Username: ${existingUser.username} is already in use`)
            return res.status(409).json('Username is already in use')
        } else {
            await userServices.registerUser(req.body);
            res.status(201).json('Register Ok');
        }
    } catch (error) {
        next(error)
    }
}

const listUsers = async (req, res, next) => {
    try {
        const users = await userServices.getUsers();
        if (users.length < 1) {
            logger.info(`No users in database`);
            res.status(404).json('No users in database')
        } else {
            logger.info(users)
            res.status(200).json(users)
        }
    } catch (error) {
        next(error)
    }
}

/* const postRegister = (req, res) => {
    try {
        //console.log(req.user)
        res.status(201).json('Register Ok');
    } catch (error) {
        next(error)
    }
} */


export {
    loginStrategy,
    getUserInfo,
    listUsers,
    getLogin,
    postLogin,
    getRegister,
    postRegister
}