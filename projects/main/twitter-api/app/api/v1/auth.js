import jwt from 'jsonwebtoken';

import { configuration } from '../../config.js';

const { token } = configuration;
const { secret, expires } = token;

export const signToken = (payload, expiresIn = expires) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const auth = (req, res, next) => {
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

    req.decoded = decoded;
    next();
  });
};

export const me = (req, res, next) => {
  const { decoded = {}, params = {} } = req;
  const { username } = decoded;
  const { username: usernameParam } = params;

  if (username !== usernameParam) {
    return next({
      message: 'Forbidden',
      status: 403,
    });
  }

  next();
};

export const owner = (req, res, next) => {
  const { decoded = {}, data = {} } = req;
  const { id: ownerId } = decoded;
  const { userId } = data;

  if (ownerId !== userId) {
    return next({
      message: 'Forbidden',
      status: 403,
    });
  }

  next();
};
