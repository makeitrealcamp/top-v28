import { prisma } from '../../../database.js';
import { fields, transformTweet, TweetSchema } from './model.js';
import { parseOrderParams, parsePaginationParams } from '../../../utils.js';

import * as tweetService from './service.js';

export const create = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { id: userId } = decoded;

  try {
    const { success, data, error } = await TweetSchema.safeParseAsync({
      ...body,
      photo: req.file?.path,
    });

    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }
    const result = await tweetService.createTweet(data, userId);
   

    const tweet = transformTweet(result);

    res.status(201);
    res.json({
      data: tweet,
    });
  } catch (error) {
    next(error);
  }
};

export const all = async (req, res, next) => {
  const { query, params = {} } = req;
  const { offset, limit } = parsePaginationParams(query);
  const { orderBy, direction } = parseOrderParams({
    fields,
    ...query,
  });
  const { decoded = {} } = req;
  const { id: userId } = decoded;

  const parentId = params.id ? params.id : null;

  try {
    const [result, total] = await tweetService.getAllTweets({parentId, offset, limit, orderBy, direction, userId});

    const data = result.map(transformTweet);

    res.json({
      data,
      meta: {
        limit,
        offset,
        total,
        orderBy,
        direction,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const id = async (req, res, next) => {
  const { params = {} } = req;
  const { decoded = {} } = req;
  const { id: userId } = decoded;

  try {
    const result = await prisma.tweet.findUnique({
      where: {
        id: params.id,
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

    if (result === null) {
      next({
        message: 'Tweet not found',
        status: 404,
      });
    } else {
      const tweet = transformTweet(result);
      req.data = tweet;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const read = async (req, res, next) => {
  res.json({
    data: req.data,
  });
};

export const update = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;
  const { decoded = {} } = req;
  const { id: userId } = decoded;

  try {
    const { success, data, error } = await TweetSchema.partial().safeParseAsync(
      {
        ...body,
        photo: req.file?.path,
      },
    );
    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }

    const result = await tweetService.updateTweet(id, data);

    const tweet = transformTweet(result);

    res.json({
      data: tweet,
    });
  } catch (error) {
    next(error);
  }
};

export const like = async (req, res, next) => {
  const { params = {}, decoded = {} } = req;
  const { id: tweetId } = params;
  const { id: userId } = decoded;

  try {
    const liked = await prisma.like.findUnique({
      where: {
        userId_tweetId: {
          userId,
          tweetId,
        },
      },
    });

    if (liked === null) {
      await prisma.like.create({
        data: {
          userId,
          tweetId,
          updatedAt: new Date().toISOString(),
        },
      });
    } else {
      await prisma.like.delete({
        where: {
          userId_tweetId: {
            userId,
            tweetId,
          },
        },
      });
    }

    const result = await prisma.tweet.findUnique({
      where: {
        id: params.id,
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

    const tweet = transformTweet(result);

    res.json({
      data: tweet,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.tweet.delete({
      where: { id },
    });

    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
