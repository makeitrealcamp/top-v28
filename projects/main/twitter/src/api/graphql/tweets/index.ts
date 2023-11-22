export const GET_ALL_TWEETS_QUERY = `
    query GetAllTweets($parentId: ID, $offset: Int, $limit: Int, $orderBy: String, $direction: String, $userId: ID) {
        getAllTweets(parentId: $parentId, offset: $offset, limit: $limit, orderBy: $orderBy, direction: $direction, userId: $userId) {
            tweets{
                content
            }
            totals 
        }
     }`;
