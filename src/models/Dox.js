const { Schema, model } = require('mongoose');

const doxSchema = new Schema({
    title: {
      required: true,
      unique: true,
      type: String
    },
    content: {
      required: true,
      type: String
    },
    description: String,
    author: {
      ref: 'User',
      type: Schema.Types.ObjectId
    },
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    star: {
      type: Boolean,
      default: false
    },
    deleted: {
      type: Boolean,
      default: false
    },
    tags: [{
      type: String
    }],
    date: Date
})

module.exports = model('Dox', doxSchema);