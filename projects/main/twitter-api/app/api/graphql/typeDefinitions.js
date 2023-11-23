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

  type AllTweets {
    tweets: [Tweet]
    totals: Int
  }
  type LoginUser {
    token: String
    user: User
  }

  type UserCreated {
    email: String
  }

  input CreateUserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }
  # ROOT TYPES

  type Query {
    getAllTweets(
      parentId: ID
      offset: Int
      limit: Int
      orderBy: String
      direction: String
      userId: ID
    ): AllTweets
  }

  type Mutation {
    createTweet(content: String!, photo: String, parentId: ID): Tweet!
    updateTweet(id: ID!, content: String, photo: String, parentId: ID): Tweet!
    createUser(
      name: String!
      username: String!
      email: String!
      password: String!
    ): UserCreated!
    loginUser(email: String!, password: String!): LoginUser!
  }
`;
