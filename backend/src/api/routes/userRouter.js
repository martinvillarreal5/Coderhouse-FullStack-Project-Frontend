import { Router } from 'express';
import passport from 'passport';
import logger from '../../utils/logger.js';
import {
  getLogin,
  postLogin,
  listUsers,
  getRegister,
  postRegister
} from '../controllers/userController.js'
import { ensureAuth } from '../middleware/auth.js'

const router = Router();

router.get("/", ensureAuth, (req, res) => {
  console.log("Getting User")
  res.status(200).json({user:
    {
      username: req.user.username,
      email: req.user.email,
    }
  })
})
router.get('/list', listUsers)
router.get('/login', getLogin);
router.post('/login',
  passport.authenticate('login'),
  postLogin
);
router.get('/register', getRegister)
router.post('/register', postRegister);
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    } else {
      /* req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.send('Logout successful')
        }
      }); */
      res.send('Logout successful') //check if session destroy is needed, and more security options, 
      //check status code for logout
    }
  });
  //res.redirect('/');
  //res.render('login')
});

export default router

/* 
Hola Salva como estas? Disculpa que te joda pero tengo una duda un tanto especifica y no encuentro solución. Me hice un frontend para el proyecto usando React y axios para hacer el fetch, que al entrar a la pagina el navbar manda un request al server para saber si ha iniciado session y segun eso mostrar ciertos links. Y anda perfecto pero ll entrar y no estar logueado el servidor logicamente me responde con un 401, pero el tema es que me figura como un error desde el front
*/