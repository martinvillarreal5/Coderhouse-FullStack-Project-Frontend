import { Router } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local'
import {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  registerStrategy,
  loginStrategy
} from '../controllers/userController.js'
import {
  getUserById
} from '../../services/userServices.js'


const router = Router();

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser( (user, done) => {
  done(null, user._id);
}); 

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id)
    if (user) {
      return done(null, user); // return valid object if user exists in our database
    } else {
      return done(null, false); // return false if user doesn't exists
    }
  } catch (error) {

  }
}); 

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

router.get('/login', getLogin);
router.post('/login',
  passport.authenticate('login', {
    //successRedirect: '/',
    //failureRedirect: '/login'
  }),
  postLogin
);

router.get('/register', getRegister)
router.post('/register',
  passport.authenticate('register', { 
    //successRedirect: '/',
    //failureRedirect: "/register" 
    failureMessage: true
  }),
  postRegister
);

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
  //res.render('login')
});


export default router