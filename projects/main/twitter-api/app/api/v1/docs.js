import merge from 'lodash/merge.js';

import tweets from './tweets/docs.json' assert { type: 'json' };

export const swaggerDefinition = merge(
  {
    openapi: '3.0.3',
    info: {
      title: 'Twitter API',
      version: '1.0.0',
    },
    servers: [
      {
        url: `${process.env.API_URL}/v1`,
      },
    ],
  },
  tweets,
);
