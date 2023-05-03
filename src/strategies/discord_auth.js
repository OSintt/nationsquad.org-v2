const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../models/User');

import { config } from 'dotenv';

config();

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findOne({userId: userId});
    return user ? done(null, user) : done (null, null);
  } catch(e) {
    done(e, null);
  }
});

const isProd = process.env.NODE_ENV === 'production';
const clientID = isProd ? process.env.CLIENT_ID : process.env.DEV_CLIENT_ID;
const callbackUrl = isProd ? process.env.CALLBACK_URI_PROD : process.env.CALLBACK_URI;
const  clientSecret = isProd ? process.env.CLIENT_SECRET : process.env.DEV_CLIENT_SECRET;
passport.use(
  new DiscordStrategy({
    clientID,
    callbackUrl,
    clientSecret,
    scope: ['identify']
  }, async (accessToken, refreshToken, profile, done) => {
    const { id, username, discriminator, avatar } = profile;
    try {
      const user = await User.findOneAndUpdate({userId: id}, {
        username,
        discriminator,
        avatar,
        admin: id === '757437960160542811'
      }, {
        new: true
      });
      
      if (!user) {
        const newUser = new User({
          userId: id,
          date: new Date(),
          username,
          discriminator,
          nick: username,
          avatar
        });
        if (id === '757437960160542811') {
          newUser.admin = true;
          newUser.mod = true;
        }
        await newUser.save();
        return done(null, newUser);
      } else {
        return done(null, user);
      }
    } catch(e) {
      return done(e, null);
    }
  })
)