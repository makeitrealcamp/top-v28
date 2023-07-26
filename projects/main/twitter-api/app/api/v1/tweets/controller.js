import { prisma } from '../../../database.js';
import { parsePaginationParams } from '../../../utils.js';

export const create = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const result = await prisma.tweet.create({
      data: body,
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

  try {
    const [result, total] = await Promise.all([
      prisma.tweet.findMany({
        skip: offset,
        take: limit,
      }),
      prisma.tweet.count(),
    ]);

    res.json({
      data: result,
      meta: {
        limit,
        offset,
        total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const read = async (req, res, next) => {
  const { params = {} } = req;
  try {
    const result = await prisma.tweet.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!result) {
      return next({
        message: 'Tweet not found',
        status: 404,
      });
    }

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const update = (req, res) => {
  res.json({
    data: {},
  });
};

export const remove = (req, res) => {
  res.status(204);
  res.end();
};
