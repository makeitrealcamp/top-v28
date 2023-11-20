
import * as prismaRepository from "./repository.prisma.js"
import { configuration } from '../../../config.js';
const { order, pagination } = configuration;


export const createTweet = async (data, userId) => {
    return await prismaRepository.createTweet(data, userId);
};

export const getAllTweets = async ({parentId, offset, limit, orderBy=order.orderBy, direction=order.direction, userId}) => {
    console.log({parentId, offset, limit, orderBy, direction, userId});
    return await Promise.all([prismaRepository.getAllTweets({parentId, offset, limit, orderBy, direction, userId}), prismaRepository.countTweets(parentId)]);
};