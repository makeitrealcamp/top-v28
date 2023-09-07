import { prisma } from '../../../database.js';
import {
  encryptPassword,
  verifyPassword,
  UserSchema,
  LoginSchema,
} from './model.js';

import { signToken } from '../auth.js';

export const signup = async (req, res, next) => {
  const { body = {} } = req;

  console.log({ body });
  console.log(req.file);

  try {
    const { success, data, error } = await UserSchema.safeParseAsync({
      ...body,
      photo: req.file?.path,
    });
    console.log(req.file?.path);
    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }

    const password = await encryptPassword(data.password);
    const user = await prisma.user.create({
      data: {
        ...data,
        password,
      },
      select: {
        name: true,
        email: true,
        username: true,
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

  try {
    const { success, data, error } = await LoginSchema.safeParseAsync(body);
    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }

    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        password: true,
        photo: true,
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

    const { id, username } = user;
    const token = signToken({ id, username });

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

export const username = async (req, res, next) => {
  const { params = {} } = req;
  const { username } = params;

  try {
    const result = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        name: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

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
  const { username } = params;

  try {
    const { success, data, error } = await UserSchema.partial().safeParseAsync(
      body,
    );
    if (!success) {
      return next({
        message: 'Validator error',
        status: 400,
        error,
      });
    }

    const result = await prisma.user.update({
      where: {
        username,
      },
      data: {
        ...data,
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
  const { username } = params;

  try {
    await prisma.user.delete({
      where: { username },
    });

    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
