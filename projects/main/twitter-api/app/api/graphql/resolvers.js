
import * as tweetService from '../v1/tweets/service.js';
import * as userService from '../v1/users/users.service.js';
import { v4 as uuid } from 'uuid'

/*

query GetAllTweets($parentId: ID, $offset: Int, $limit: Int, $orderBy: String, $direction: String, $userId: ID) {
  getAllTweets(parentId: $parentId, offset: $offset, limit: $limit, orderBy: $orderBy, direction: $direction, userId: $userId) {

    content
 
  }
}
*/



export const resolvers = {
    Query: {
        getAllTweets: async (_, { parentId, offset, limit, orderBy, direction, userId }, { }) => {
            return await tweetService.getAllTweets({ parentId, offset, limit, orderBy, direction, userId });
        }
    },

    Mutation: {
        createTweet: async (_, { content, photo, parentId }, { userId = uuid() }) => {
            return await tweetService.createTweet({ content, photo, parentId }, userId);
        },
        createUser: async (_, { name, username, email, password },) => {
            return await userService.createUser({ name, username, email }, password);
        }
    }
};