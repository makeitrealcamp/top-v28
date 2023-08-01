// import { Prisma } from '@prisma/client';

import { prisma } from '../../../database.js';
import { fields } from './model.js';
import { parseOrderParams, parsePaginationParams } from '../../../utils.js';

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
  const { orderBy, direction } = parseOrderParams({
    fields,
    ...query,
  });

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
            },
          },
          _count: {
            select: {
              comments: true,
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
  try {
    // Method 2: findUniqueAndThrow
    const result = await prisma.tweet.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    });

    // Method 1
    if (result === null) {
      next({
        message: 'Tweet not found',
        status: 404,
      });
    } else {
      req.result = result;
      next();
    }
  } catch (error) {
    // Method 2
    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (error.code === 'P2025') {
    //     next({
    //       message: 'Tweet not found',
    //       status: 404,
    //     });
    //   }
    // } else {
    //   next(error);
    // }
    next(error);
  }
};

export const read = async (req, res, next) => {
  res.json({
    data: req.result,
  });
};

export const update = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  try {
    const result = await prisma.tweet.update({
      where: {
        id,
      },
      data: {
        ...body,
        updatedAt: new Date().toISOString(),
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
