import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  biography: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  profilePhoto: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  tweets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet'
  }]

});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


export const User = mongoose.model('User', userSchema);