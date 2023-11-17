import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({

  content: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parentId: {
    type: mongoose.Schema.Types.String, // Assuming UUIDs are stored as strings
    required: false
  },

});

// If you want to update the 'updatedAt' field automatically on save
tweetSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const Tweet = mongoose.model('Tweet', tweetSchema);