import { model, Schema } from 'mongoose';

const BadgeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true,
        unique: true
    },
    index: {
        type: Number,
        required: true,
        unique: true
    },
});

module.exports = model('Badge', BadgeSchema);