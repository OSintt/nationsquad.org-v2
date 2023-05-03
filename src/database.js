import { config } from 'dotenv';

config()

const mongoose = require('mongoose');
mongoose.connect(process.env.URI).then(db => console.log('DB Connected'))

//pone estas cosas en un env -_-