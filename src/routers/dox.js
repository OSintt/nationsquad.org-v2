import { Router } from 'express';
import {
  postDox,
  getDoxes,
  getDox,
  deleteDox,
  getStarDoxes,
  makeStarDox,
  getLikedDoxes,
  like,
  getHisDoxes,
  searchDoxes
} from '../controllers/dox.controller';
import { isAuthorized, isAdmin } from '../middlewares/auth.middlewares';
import {
  isDoxLength, 
  isDoubleDox,
  addView,
  doesDoxExist,
  checkCaptcha
} from '../middlewares/checking.middleware';

const router = Router();

router.get('/mierda/:int', getDoxes);
router.get('/from/:userId/:int', getHisDoxes);
router.route('/basura/:id')
  .get([doesDoxExist, addView], getDox)
  .delete([isAuthorized, doesDoxExist], deleteDox)
  
router.get('/look-for/:query', searchDoxes);
router.get('/like/:id', [isAuthorized, doesDoxExist], like)

router.get('/star', getStarDoxes);
router.get('/star/:id', [isAuthorized, isAdmin, doesDoxExist], makeStarDox);
router.get('/fav/:int', [isAuthorized], getLikedDoxes);
router.post('/post-dox', [isDoxLength, isDoubleDox, checkCaptcha], postDox);

module.exports = router ; //cambiamos la ruta de la api por /puta? XD dale ya esta xddddd jaskj /api/dox/mierda? xd