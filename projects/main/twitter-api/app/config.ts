import * as dotenv from 'dotenv';

import { OrderOptions, type Configuration } from './types.ts';

dotenv.config();

export const configuration: Configuration = {
  server: {
    port: Number(process.env.PORT),
  },
  pagination: {
    limit: '10',
    offset: '0',
  },
  order: {
    options: [OrderOptions.ASC, OrderOptions.DESC],
    direction: OrderOptions.DESC,
    orderBy: 'createdAt',
  },
  token: {
    secret: String(process.env.TOKEN_SECRET),
    expires: String(process.env.TOKEN_EXPIRES),
  },
  rateLimit: {
    points: Number(process.env.RATE_LIMIT_POINTS),
    duration: Number(process.env.RATE_LIMIT_DURATION),
  },
};
