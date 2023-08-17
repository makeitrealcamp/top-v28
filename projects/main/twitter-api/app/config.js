import * as dotenv from 'dotenv';

dotenv.config();

export const configuration = {
  server: {
    port: process.env.PORT,
  },
  pagination: {
    limit: 10,
    offset: 0,
  },
  order: {
    options: ['asc', 'desc'],
    direction: 'desc',
    orderBy: 'createdAt',
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expires: process.env.TOKEN_EXPIRES,
  },
  rateLimit: {
    points: process.env.RATE_LIMIT_POINTS,
    duration: process.env.RATE_LIMIT_DURATION,
  },
};
