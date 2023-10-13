import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT,
  token: {
    secret: process.env.TOKEN_SECRET,
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  },
};
