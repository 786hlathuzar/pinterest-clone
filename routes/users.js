const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/pinterestClone")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    // required: true,
  },
  post: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  dp: {
    type: String, // URL or file path for the profile picture
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});
userSchema.plugin(plm)

module.exports = mongoose.model('User', userSchema);
