import {
  ban,
  makeMod,
  makeVip,
  me,
  getUser,
  logout,
  editBio,
  editNick,
  login
} from '../controllers/auth.controller';
import { Router } from 'express';
import passport from 'passport';
import { config } from 'dotenv';
import { isAuthorized, isAdmin } from '../middlewares/auth.middlewares';
const router = Router();

config();

router.get('/login', passport.authenticate('discord'));
router.get('/login/redirect', passport.authenticate('discord'), login);
router.put('/new-nick', [isAuthorized], editNick);
router.put('/new-bio', [isAuthorized], editBio);
router.get('/logout', [isAuthorized], logout);
router.get('/make-mod/:id', [isAuthorized, isAdmin], makeMod);
router.get('/vip/:id', [isAuthorized, isAdmin], makeVip);
router.route('/profile/:id')
  .get(getUser)
  .delete([isAuthorized], ban);
router.get('/@me', [isAuthorized], me);

module.exports = router;