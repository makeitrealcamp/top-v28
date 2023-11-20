import { prisma } from "../../../database.js";


export const createTweet = async (data, userId) => {
    return await prisma.tweet.create({
        data: {
            ...data,
            userId,
        },
        include: {
            user: {
                select: {
                    name: true,
                    username: true,
                    email: true,
                    profilePhoto: true,
                },
            },
            // Count the number of likes
            _count: {
                select: {
                    likes: true,
                },
            },
            // isLiked
            likes: {
                select: {
                    userId: true,
                },
                where: {
                    userId,
                },
            },
            // Collection of comments
            children: {
                select: {
                    id: true,
                },
            },
        },
    });
};

export const getAllTweets = async ({ parentId, offset, limit, orderBy, direction, userId }) => {

    return await prisma.tweet.findMany({
        where: {
            parentId,
        },
        skip: offset,
        take: limit,
        orderBy: {
            [orderBy]: direction,
        },
        include: {
            user: {
                select: {
                    name: true,
                    username: true,
                    email: true,
                    profilePhoto: true,
                },
            },
            // Count the number of likes
            _count: {
                select: {
                    likes: true,
                },
            },
            // isLiked
            likes: {
                select: {
                    userId: true,
                },
                where: {
                    userId,
                },
            },
            // Collection of comments
            children: {
                select: {
                    id: true,
                },
            },
        },
    });
};

export const countTweets = async (parentId) => {
    return await prisma.tweet.count({
        where: {
            parentId,
        },
    });
};

export const updateTweet = async (id, data) => {
    return await prisma.tweet.update({
        where: {
            id,
        },
        data: {
            ...data,
            updatedAt: new Date().toISOString(),
        },
        include: {
            user: {
                select: {
                    name: true,
                    username: true,
                    email: true,
                    profilePhoto: true,
                },
            },
            _count: {
                select: {
                    likes: true,
                },
            },
            likes: {
                select: {
                    userId: true,
                },
                where: {
                    userId,
                },
            },
            children: {
                select: {
                    id: true,
                },
            },
        },
    });
}