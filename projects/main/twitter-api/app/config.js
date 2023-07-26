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
};
