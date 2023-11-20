import * as tweetService from '../v1/tweets/service.js';

export const resolvers = {
    Query: {
        getAllTweets: async (_, { parentId, offset, limit, orderBy, direction, userId }, { dataSources }) => {
            return await tweetService.getAllTweets({ parentId, offset, limit, orderBy, direction, userId });
        }
    },
};