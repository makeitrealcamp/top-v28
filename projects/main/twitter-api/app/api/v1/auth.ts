import jwt from 'jsonwebtoken';
import { RateLimiterMemory } from 'rate-limiter-flexible';

import { configuration } from '../../config.ts';
import { NextFunction, Request } from 'express';
import { RequestWithDecoded } from '../../types.ts';

const { token, rateLimit } = configuration;
const { secret, expires } = token;
const { points, duration } = rateLimit;

const rateLimiter = new RateLimiterMemory({
  points,
  duration,
});

export const signToken = (
  payload: Record<string, string>,
  expiresIn = expires,
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization || '';
  if (token.startsWith('Bearer')) {
    token = token.substring(7);
  }

  if (!token) {
    return next({
      message: 'Unauthorized',
      status: 401,
    });
  }

  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      return next({
        message: 'Unauthorized',
        status: 401,
      });
    }

    (req as RequestWithDecoded).decoded = decoded as Record<string, string>;
    next();
  });
};

export const me = (req: Request, res: Response, next: NextFunction) => {
  const { params = {} } = req;
  const { username } = (req as RequestWithDecoded).decoded;
  const { username: usernameParam } = params;

  if (username !== usernameParam) {
    return next({
      message: 'Forbidden',
      status: 403,
    });
  }

  next();
};

export const owner = (req: Request, res: Response, next: NextFunction) => {
  const { data = {} } = req;
  const { id: ownerId } = (req as RequestWithDecoded).decoded;
  const { userId } = data;

  if (ownerId !== userId) {
    return next({
      message: 'Forbidden',
      status: 403,
    });
  }

  next();
};

export const limit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const ip = req.ip;
  try {
    await rateLimiter.consume(ip, 1);
    next();
  } catch (error) {
    next({
      status: 429,
      message: 'Too many requests',
    });
  }
};
