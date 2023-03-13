const mongoose = require('mongoose');


const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  videos: [{
    id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    watchedDate: {
      type: Date,
    },
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  current: {
    id: {
      type: String,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  total:{
    type: Number,
    required: true,
  },
  subordub:{
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  info:{
    type: String,
    required: true,
  }
  
}, {
  timestamps: true,
});

module.exports = mongoose.model('Playlist', playlistSchema);
