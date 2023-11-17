import { Tweet } from "./mongoose.model.js";

export const createTweet = async (userId, tweetData) => {
    const tweet = new Tweet({ ...tweetData, ...userId });
    return tweet.save();
};

// Read - Get a single tweet by ID
export const getTweetById = async (id) => {
    return Tweet.findById(id);
};

// Read - Get all tweets
export const getAllTweets = async () => {
    return Tweet.find();
};

// Update
export const updateTweetById = async (id, updateData) => {
    return Tweet.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete
export const deleteTweetById = async (id) => {
    return Tweet.findByIdAndDelete(id);
};