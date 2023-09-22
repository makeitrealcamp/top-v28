import { prisma } from '../../../database.js';
import { CommentSchema, fields } from './model.js';
import { parseOrderParams, parsePaginationParams } from '../../../utils.js';

export const create = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { id: userId } = decoded;

  try {
    const { success, data, error } = await CommentSchema.safeParseAsync(body);
    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }
    const result = await prisma.comment.create({
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
  const { query, params } = req;
  const { offset, limit } = parsePaginationParams(query);
  const { orderBy, direction } = parseOrderParams({
    fields,
    ...query,
  });
  const { tweetId } = params;

  try {
    const [result, total] = await Promise.all([
      prisma.comment.findMany({
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
        },
        where: {
          tweetId,
        },
      }),
      prisma.comment.count(),
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
    const result = await prisma.comment.findUnique({
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
      },
    });

    if (result === null) {
      next({
        message: 'comment not found',
        status: 404,
      });
    } else {
      req.result = result;
      next();
    }
  } catch (error) {
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
    const { success, data, error } =
      await CommentSchema.partial().safeParseAsync(body);
    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }

    const result = await prisma.comment.update({
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
    await prisma.comment.delete({
      where: { id },
    });

    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
