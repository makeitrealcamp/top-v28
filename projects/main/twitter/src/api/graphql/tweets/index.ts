export const CREATE_TWEET_MUTATION = `
mutation CreateTweet($payload: CreateTweetInput!) {
    createTweet(payload: $payload) {
        id
        text
        user {
            id
            name
            username
            avatar
        }
    }
 }
            `;

export const GET_ALL_TWEETS_QUERY = `
    query GetAllTweets($parentId: ID, $offset: Int, $limit: Int, $orderBy: String, $direction: String, $userId: ID) {
        getAllTweets(parentId: $parentId, offset: $offset, limit: $limit, orderBy: $orderBy, direction: $direction, userId: $userId) {
            content 
        }
     }`;
