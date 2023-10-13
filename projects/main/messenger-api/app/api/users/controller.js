import { prisma } from '../../database.js';
import { encryptPassword, verifyPassword } from './model.js';
import { signToken } from '../auth.js';

export async function signup(req, res, next) {
  const { body = {} } = req;

  try {
    const password = await encryptPassword(body.password);
    const user = await prisma.user.create({
      data: {
        ...body,
        password,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function signin(req, res, next) {
  const { body } = req;
  const { email, password } = body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
      },
    });

    if (user === null) {
      return next({
        message: 'Invalid email or password',
        status: 400,
      });
    }

    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return next({
        message: 'Invalid email or password',
        status: 400,
      });
    }

    const { id, username } = user;
    const token = signToken({ id, username });

    res.json({
      ...user,
      id: undefined,
      password: undefined,
      token,
    });
  } catch (error) {
    next(error);
  }
}

export async function list(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
}
