import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
//import rateLimit from 'express-rate-limit';
import path from 'path';
import helmet from 'helmet'
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import Store from 'connect-mongo';
import './database';
import './strategies/discord_auth';
//import { deleteData, createData, updateUsers, createBadges } from './lib/createData';
import { modifyBadges } from './lib/addBadge';

config();
const app = express();
// RateLimiter
/*const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
})*/

// Settings
app.set('port', process.env.PORT || 3001);

// Middlewares
const origin = process.env.NODE_ENV === 'production' ? process.env.DOMAIN : process.env.DOMAIN2;
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin,
  credentials: true
}));
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false}));
app.use(
  session({
    secret: process.env.SECRET_AUTH,
    name: 'nsnt.mierda',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60 * 24,
      store: Store.create({
        mongoUrl: process.env.URI
      })
    }
  })
);

app.use(passport.initialize());
app.use(passport.session()); // Dedicame alguna ruta e.e
//app.use(limiter);

// Routers
app.use('/puta', require('./routers/api'));

if (process.env.NODE_ENV === 'production') {
  // Static files
  app.use('/static', express.static(path.join(__dirname, './build/static')))

  // Mount React
  app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, './build', 'index.html'));
  })
}

// Start listening
app.listen(app.get('port'), () => {
    console.log('Listening on port', app.get('port'));
    //modifyBadges();
})