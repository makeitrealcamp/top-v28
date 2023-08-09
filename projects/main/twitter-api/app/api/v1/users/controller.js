// import { Prisma } from '@prisma/client';

import { prisma } from '../../../database.js';
import { encryptPassword, fields, verifyPassword } from './model.js';
import { parseOrderParams, parsePaginationParams } from '../../../utils.js';
import { signToken } from '../auth.js';

export const signup = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const password = await encryptPassword(body.password);
    const user = await prisma.user.create({
      data: {
        ...body,
        password,
      },
      select: {
        name: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

    res.status(201);
    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        createdAt: true,
        password: true,
      },
    });

    if (user === null) {
      return next({
        message: 'Invalid email or password',
        status: 401,
      });
    }

    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return next({
        message: 'Invalid email or password',
        status: 401,
      });
    }

    const token = signToken({ id: user.id });

    res.json({
      data: {
        ...user,
        id: undefined,
        password: undefined,
      },
      meta: {
        token,
      },
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
      prisma.user.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        select: {
          name: true,
          email: true,
          username: true,
          createdAt: true,
        },
      }),
      prisma.user.count(),
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
    const result = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      select: {
        name: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

    // Method 1
    if (result === null) {
      next({
        message: 'user not found',
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
    //       message: 'user not found',
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
    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...body,
        updatedAt: new Date().toISOString(),
      },
      select: {
        name: true,
        email: true,
        username: true,
        createdAt: true,
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
    await prisma.user.delete({
      where: { id },
    });

    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
