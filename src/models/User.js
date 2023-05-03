import { model, Schema } from 'mongoose';
import { config } from 'dotenv';
config();
const UserSchema = new Schema({
  username: {
    required: true,
    type: String
  },
  discriminator: {
    required: true,
    type: String
  },
  userId: {
    required: true,
    unique: true,
    type: String,
  },
  avatar: String,
  nick: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: `usuario promedio de ${process.env.DOMAIN}`
  },
  doxes: [{
    ref: 'Dox',
    type: Schema.Types.ObjectId
  }],
  liked_doxes: [{
    ref: 'Dox',
    type: Schema.Types.ObjectId
  }],
  badges: [{
    ref: 'Badge',
    type: Schema.Types.ObjectId
  }],
  admin: {
    default: false,
    type: Boolean
  },
  mod: {
    default: false,
    type: Boolean
  },
  ban: {
    default: false,
    type: Boolean
  },
  date: Date
});

module.exports = model('User', UserSchema);
