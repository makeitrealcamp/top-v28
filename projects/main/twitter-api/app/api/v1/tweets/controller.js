import { prisma } from '../../../database.js';
import { fields, TweetSchema } from './model.js';
import { parseOrderParams, parsePaginationParams } from '../../../utils.js';

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

    const result = await prisma.tweet.create({
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
      },
    });

    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const all = async (req, res, next) => {
  const { query } = req;
  const { offset, limit } = parsePaginationParams(query);
  const { orderBy, direction } = parseOrderParams({
    fields,
    ...query,
  });
  const { decoded = {} } = req;
  const { id: userId } = decoded;

  try {
    const [result, total] = await Promise.all([
      prisma.tweet.findMany({
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
          _count: {
            select: {
              comments: true,
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
        },
      }),
      prisma.tweet.count(),
    ]);

    res.json({
      data: result,
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
            comments: true,
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
      },
    });

    if (result === null) {
      next({
        message: 'Tweet not found',
        status: 404,
      });
    } else {
      req.data = result;
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

    const result = await prisma.tweet.update({
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
            comments: true,
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
      },
    });

    res.json({
      data: result,
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
            comments: true,
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
      },
    });

    res.json({
      data: result,
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
