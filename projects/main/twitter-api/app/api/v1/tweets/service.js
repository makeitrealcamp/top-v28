import * as TweetRepository from './mongoose.repository.js';


export const createTweet = async (userId, tweetData) => {

    return await TweetRepository.createTweet(userId, tweetData);

};