import { prisma } from '../../../database.js';
import {
  encryptPassword,
  verifyPassword,
  UserSchema,
  LoginSchema,
} from './model.js';

import { signToken } from '../auth.js';
import { transporter } from '../../../mail.js';

export const signup = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const { success, data, error } = await UserSchema.safeParseAsync({
      ...body,
      profilePhoto: req.file?.path,
    });

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
        email: true,
      },
    });

    req.body.email = user.email;
    next();
  } catch (error) {
    next(error);
  }
};

export const confirmation = async (req, res, next) => {
  const { body = {} } = req;
  const { email } = body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
        active: false,
      },
      select: {
        name: true,
        email: true,
        username: true,
        profilePhoto: true,
      },
    });

    if (user === null) {
      next({
        message: 'Confirmation failed',
        status: 400,
      });
    } else {
      const token = signToken({ email }, '2h');

      await transporter.sendMail({
        from: `Twitter ${process.env.EMAIL_SENDER}`,
        to: email,
        subject: 'Activate your account',
        text: `
          Visit the following link to activate your account:
          ${process.env.WEB_URL}/activate/${token}
        `,
        html: `
          <p>
            Visit the following link to activate your account:
            <a 
              href="${process.env.WEB_URL}/activate/${token}"
              target="_blank"
            >
              Activate
            </a>
          </p>
        `,
      });

      res.status(201);
      res.json({
        data: user,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const activate = async (req, res, next) => {
  const { decoded = {} } = req;
  const { email } = decoded;

  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      select: {
        name: true,
        email: true,
        username: true,
        profilePhoto: true,
      },
      data: {
        active: true,
      },
    });

    if (user === null) {
      next({
        message: 'Activation failed',
        status: 400,
      });
    } else {
      res.json({
        data: user,
      });
    }
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
        active: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        password: true,
        profilePhoto: true,
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
        profilePhoto: true,
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
        profilePhoto: true,
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
