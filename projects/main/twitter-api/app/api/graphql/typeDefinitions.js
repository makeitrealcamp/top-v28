import { gql } from 'graphql-tag';

export const typeDefs = gql`
type Tweet {
    id: ID!
    content: String
    photo: String
    createdAt: String
    updatedAt: String
    user: User!
    userId: ID!
    likes: [Like]
    parentId: ID
    parent: Tweet
    children: [Tweet]
  }
  
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    biography: String
    location: String
    profilePhoto: String
    password: String!
    active: Boolean!
    createdAt: String!
    updatedAt: String
    tweets: [Tweet]
    likes: [Like]
  }
  
  type Like {
    user: User!
    userId: ID!
    tweet: Tweet!
    tweetId: ID!
    updatedAt: String
  }



  type Query {
    createTweet(content: String!, photo: String, parentId: ID): Tweet!,
    getAllTweets(parentId: ID, offset: Int, limit: Int, orderBy: String, direction: String, userId: ID): [Tweet],
  }

  type Mutation {
    createTweet(content: String!, photo: String, parentId: ID): Tweet!
  }

`;